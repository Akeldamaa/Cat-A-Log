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
import openai
import logging

# Setup logger
logger = logging.getLogger(__name__)

# API keys (replace with your keys)
REPLICATE_API_KEY = ""
OPENAI_API_KEY = " "

# Paths to your templates
TEMPLATES = {
    "common": os.path.join(os.getenv('MEDIA_ROOT', 'backend/media'), 'uploads/templates/Green_2.png'),
    "uncommon": os.path.join(os.getenv('MEDIA_ROOT', 'backend/media'), 'uploads/templates/blue_2.png'),
    "rare": os.path.join(os.getenv('MEDIA_ROOT', 'backend/media'), 'uploads/templates/purple_2.png'),
    "legendary": os.path.join(os.getenv('MEDIA_ROOT', 'backend/media'), 'uploads/templates/orange_2.png')
}

# Replicate API URL and the specific model version we want to use
REPLICATE_API_URL = "https://api.replicate.com/v1/predictions"
MODEL_VERSION = "4acb778eb059772225ec213948f0660867b2e03f277448f18cf1800b96a65a1a"

# Media root directory
MEDIA_ROOT = 'Cat-A-Log/media'

@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_images(request):
    if request.method == 'POST':
        images = request.FILES.getlist('images')
        responses = []

        try:
            # Ensure the uploads directory exists
            upload_dir = os.path.join(MEDIA_ROOT, 'uploads')
            cards_dir = os.path.join(upload_dir, 'cards')
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

                # Process image with OpenCV
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

                # Convert to bytes for Replicate API
                img_byte_arr = io.BytesIO()
                grabcut_pil_img.save(img_byte_arr, format='PNG')
                img_byte_arr = img_byte_arr.getvalue()

                # Call Replicate API for sticker generation
                headers = {
                    "Authorization": f"Token {REPLICATE_API_KEY}",
                    "Content-Type": "application/json",
                }
                data = {
                    "version": MODEL_VERSION,
                    "input": {
                        "image": img_byte_arr
                    }
                }
                response = requests.post(REPLICATE_API_URL, headers=headers, json=data)

                if response.status_code != 201:
                    logger.error(f"Replicate API request failed with status {response.status_code}")
                    return JsonResponse({'status': 'error', 'message': 'Replicate API request failed'}, status=500)

                # The response includes a prediction ID that you need to poll to get the result
                prediction = response.json()
                prediction_id = prediction.get('id')
                if not prediction_id:
                    logger.error("Replicate API response missing 'id'")
                    return JsonResponse({'status': 'error', 'message': 'Replicate API response missing ID'}, status=500)

                # Polling the Replicate API until the prediction is complete
                while True:
                    prediction_response = requests.get(f"{REPLICATE_API_URL}/{prediction_id}", headers=headers)
                    prediction_result = prediction_response.json()
                    if prediction_result['status'] == 'succeeded':
                        break
                    elif prediction_result['status'] == 'failed':
                        logger.error("Replicate prediction failed")
                        return JsonResponse({'status': 'error', 'message': 'Replicate prediction failed'}, status=500)

                # Load the sticker result
                sticker_url = prediction_result['output']
                sticker_img = Image.open(io.BytesIO(requests.get(sticker_url).content))
                sticker_img = sticker_img.resize((int(grabcut_pil_img.width * 0.7), int(grabcut_pil_img.height * 0.5)))
                grabcut_pil_img.paste(sticker_img, (30, 30), sticker_img)

                # Send image to OpenAI for analysis
                openai.api_key = OPENAI_API_KEY
                openai_response = openai.Completion.create(
                    engine="text-davinci-003",
                    prompt=(
                        "The cat is a...\n"
                        "Provide the following details:\n"
                        "Breed or Type: Specify the breed or type of cat if known.\n"
                        "If all the cat breeds are categorized into 4 types of rarity, from the most common to the rarest: common, uncommon, rare, legendary, then which category would this cat be in? The answer should follow the format: The cat breed is [category]. Provide some interesting facts about the specific cat breed."
                    ),
                    max_tokens=150
                )

                gpt_text = openai_response['choices'][0]['text']
                rarity = None
                for r in TEMPLATES.keys():
                    if r in gpt_text.lower():
                        rarity = r
                        break

                if rarity is None:
                    rarity = "common"  # Default to common if no match is found

                # Load the appropriate template based on rarity
                template_img = Image.open(TEMPLATES[rarity])

                # Resize and paste the GrabCut image onto the template
                grabcut_pil_img = grabcut_pil_img.resize((int(template_img.width * 0.7), int(template_img.height * 0.5)))
                template_img.paste(grabcut_pil_img, (30, 30), grabcut_pil_img)  # Adjust position as necessary

                # Add the breed and description text to the card
                draw = ImageDraw.Draw(template_img)
                font = ImageFont.load_default()

                # Add breed
                breed_text = "Species: " + gpt_text.split("\n")[0].replace("The cat breed is", "").strip()
                draw.text((30, template_img.height - 60), breed_text, (0, 0, 0), font=font)

                # Add description
                description_text = gpt_text.split("\n")[1].replace("Provide some interesting facts about the specific cat breed.", "").strip()
                draw.text((30, template_img.height - 40), "Description: " + description_text, (0, 0, 0), font=font)

                # Save the final trading card image
                final_path = os.path.join(cards_dir, os.path.basename(file_path))
                template_img.save(final_path)

                response_data = {
                    "trading_card": final_path,  # Path to the final trading card image
                    "analysis": description_text,
                    "species": breed_text,
                }
                responses.append(response_data)

            return JsonResponse({'status': 'success', 'cards': responses})

        except Exception as e:
            logger.error(f"An error occurred during processing: {str(e)}", exc_info=True)
            return JsonResponse({'status': 'error', 'message': 'Internal server error.'}, status=500)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})
