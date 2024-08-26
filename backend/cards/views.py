from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
import os
import io
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import requests
import replicate
import base64
import textwrap
import logging

# Setup logger
logger = logging.getLogger(__name__)

# API keys
REPLICATE_API_KEY = ""
OPENAI_API_KEY = ""
MEDIA_ROOT = '/backend/media'

TEMPLATES = {
    "common": os.path.join('/media/uploads/templates', 'green.png'),
    "uncommon": os.path.join('/media/uploads/templates', 'blue.png'),
    "rare": os.path.join('/media/uploads/templates', 'purple.png'),
    "legendary": os.path.join('/Users/trangvuthao/document/media/uploads/templates', 'orange.png')
}

# Path to your custom font
FONT_PATH = '/Users/trangvuthao/document/media/uploads/templates/DelaGothicOne-Regular.ttf'

def encode_image(image_path):
    """Encode image to base64."""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def get_image_description(image_path, prompt):
    """Get description from OpenAI API based on an image."""
    base64_image = encode_image(image_path)

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }

    payload = {
        "model": "gpt-4o-mini",  # Use the correct model with image processing capabilities
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

    if response.status_code == 200:
        result = response.json()
        return result['choices'][0]['message']['content']
    else:
        logger.error(f"OpenAI API error: {response.status_code}, {response.text}")
        return None

def generate_image(message_content):
    """Generate images using Replicate API based on the description."""
    client = replicate.Client(api_token=REPLICATE_API_KEY)
    
    output = client.run(
        "fofr/sticker-maker:4acb778eb059772225ec213948f0660867b2e03f277448f18cf1800b96a65a1a",
        input={"prompt": message_content, "output_quality": 100, "number_of_images": 1}
    )
    return output

@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_images(request):
    """Upload images, process them, generate descriptions, and create stickers."""
    if request.method == 'POST':
        images = request.FILES.getlist('images')
        responses = []

        try:
            # Ensure the uploads directory exists
            upload_dir = os.path.join(MEDIA_ROOT, 'uploads')
            cards_dir = os.path.join(MEDIA_ROOT, 'cards')
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir, exist_ok=True)
                logger.info(f"Created directory: {upload_dir}")
            if not os.path.exists(cards_dir):
                os.makedirs(cards_dir, exist_ok=True)
                logger.info(f"Created directory: {cards_dir}")

            for image in images:
                # Save the uploaded image
                file_path = os.path.join(upload_dir, image.name)
                with open(file_path, 'wb+') as destination:
                    for chunk in image.chunks():
                        destination.write(chunk)

                # Process image with OpenCV to remove background
                img = cv2.imread(file_path)
                if img is None:
                    logger.error(f"Failed to read image at {file_path}")
                    return JsonResponse({'status': 'error', 'message': f'Failed to process image: {image.name}'}, status=400)

                # Initialize mask, background, and foreground models for GrabCut
                mask = np.zeros(img.shape[:2], np.uint8)
                bgd_model = np.zeros((1, 65), np.float64)
                fgd_model = np.zeros((1, 65), np.float64)
                height, width = img.shape[:2]
                rect = (int(width * 0.1), int(height * 0.1), int(width * 0.9), int(height * 0.9))
                cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)
                mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
                grabcut_img = img * mask2[:, :, np.newaxis]
                grabcut_img = cv2.cvtColor(grabcut_img, cv2.COLOR_BGR2RGB)
                grabcut_pil_img = Image.fromarray(grabcut_img)

                # Save the grabcut image for OpenAI description
                grabcut_image_path = os.path.join(cards_dir, f'grabcut_{image.name}')
                grabcut_pil_img.save(grabcut_image_path)

                # Generate a description from OpenAI for the sticker
                description_prompt = "give a detailed paragraph of the cat in the picture. Only focus on the cat, not the background, the lightning,etc...Avoid subjective comments or opinions. In your paragraph, don’t mention that you are describing a cat’s image, just talk about the cat. Start the paragraph with: The cat is a... Provide the following details: Breed or Type: Specify the breed or type of cat if known. Coat Texture and Length: Describe the texture (e.g., curly, smooth) and length (e.g., short, long) of the cat’s fur. Color and Patterns: Mention the color of the cat’s fur and any patterns or markings, such as spots, stripes, or patches. Body Shape and Size: Describe the cat’s overall body shape (e.g., slender, muscular) and size. Pose: Describe the cat’s position. Distinctive Features: Note any unique features, such as a specific marking, eye color, ear shape, or tail length. Facial Features: Detail the cat’s head shape, eye size and color, ear size and placement, and any distinctive expressions or facial markings."
                description = get_image_description(grabcut_image_path, description_prompt)

                if not description:
                    logger.error("Failed to get description from OpenAI API.")
                    return JsonResponse({'status': 'error', 'message': 'Failed to get description from OpenAI API.'}, status=500)

                # Call your Replicate API to generate an image based on the description
                output_images = generate_image(description)

                if not output_images:
                    logger.error(f"Failed to generate image with Replicate for description: {description}")
                    return JsonResponse({'status': 'error', 'message': f'Failed to generate image for: {image.name}'}, status=400)

                # Generate a detailed paragraph about the cat using a second prompt with OpenAI
                detailed_prompt = (
                    """describe the cat in the picture. If all the cat breeds are categorized into 4 types of rarity, from the most common to the rarest: common, uncommon, rare, legendary, then which category would this cat be in? Your response must follow the format below: 
                    [Cat Breed] 
                    [Type of rarity] 
                    [2 fun facts about the cat. Each fact must be on its own line] 
                    That's the format. You are supposed to fill in the square brackets, but in your response, remove the brackets."""
                )
                detailed_description = get_image_description(grabcut_image_path, detailed_prompt)

                if not detailed_description:
                    logger.error("Failed to get detailed description from OpenAI API.")
                    return JsonResponse({'status': 'error', 'message': 'Failed to get detailed description from OpenAI API.'}, status=500)

                # Extract breed and fun facts
                detailed_description_lines = detailed_description.split("\n")
                breed = detailed_description_lines[0].strip()
                fun_facts = "\n".join(detailed_description_lines[2:]).strip()

                # Determine the template based on the rarity
                rarity = detailed_description_lines[1].strip().lower()
                template_path = TEMPLATES.get(rarity, TEMPLATES["common"])

                # Load the trading card template
                trading_card = Image.open(template_path)

                # Load the output sticker image from the Replicate API
                sticker_img = Image.open(io.BytesIO(requests.get(output_images[0]).content))

                # Convert sticker image to 'RGBA' if it has transparency
                if sticker_img.mode != 'RGBA':
                    sticker_img = sticker_img.convert('RGBA')

                # Resize sticker image to fit the template area
                sticker_img = sticker_img.resize((1188, 937))

                # Convert the trading card to 'RGBA' to handle transparency correctly
                if trading_card.mode != 'RGBA':
                    trading_card = trading_card.convert('RGBA')

                # Paste the sticker onto the trading card using the sticker's alpha channel as the mask
                sticker_position = (156, 200)  # Centering the sticker within the template
                trading_card.paste(sticker_img, sticker_position, sticker_img)

                # Add breed and description text to the card
                draw = ImageDraw.Draw(trading_card)
                breed_font = ImageFont.truetype(FONT_PATH, 52)
                description_font = ImageFont.truetype(FONT_PATH, 52)

                # Position for breed text
                breed_text_position = (400, 1177)  # Adjust as needed
                draw.text(breed_text_position, breed, fill="black", font=breed_font)

                # Position for description text
                description_text_position = (185, 1400)  # Adjust as needed
                wrapped_fun_facts = textwrap.fill(fun_facts, width=40)  # Wrap text for better readability
                draw.multiline_text(description_text_position, wrapped_fun_facts, fill="black", font=description_font, spacing=10)

                # Convert the trading card to RGB mode before saving as JPEG
                trading_card = trading_card.convert('RGB')

                # Save the final trading card image
                final_card_filename = f"trading_card_{image.name}"
                final_card_path = os.path.join(cards_dir, final_card_filename)
                trading_card.save(final_card_path)

                # Construct the response data
                response_data = {
                    "trading_card": final_card_path,  # Path to the final trading card image
                    "analysis": description,
                    "detailed_description": detailed_description,
                }
                responses.append(response_data)

            return JsonResponse({'status': 'success', 'cards': responses})

        except Exception as e:
            logger.error(f"An error occurred during processing: {str(e)}", exc_info=True)
            return JsonResponse({'status': 'error', 'message': 'Internal server error.'}, status=500)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})
