from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
import os
import io
import cv2
import numpy as np
from PIL import Image
import replicate
import openai

# Your API keys
REPLICATE_API_KEY = "r8_8Z12Y3k5J0LhxC0gRsj0RADQd8QiMYw1Bg3uV"
OPENAI_API_KEY = "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"

@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_images(request):
    if request.method == 'POST':
        images = request.FILES.getlist('images')
        responses = []
        
        for image in images:
            # Save the uploaded image
            file_path = f'media/uploads/{image.name}'
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)
            
            # Open the image with OpenCV for processing
            img = cv2.imread(file_path)
            
            # Initialize mask, background, and foreground models for GrabCut
            mask = np.zeros(img.shape[:2], np.uint8)
            bgd_model = np.zeros((1, 65), np.float64)
            fgd_model = np.zeros((1, 65), np.float64)
            
            # Define the rectangle for GrabCut (assuming the cat is in the center)
            height, width = img.shape[:2]
            rect = (int(width * 0.1), int(height * 0.1), int(width * 0.9), int(height * 0.9))
            
            # Apply GrabCut
            cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)
            
            # Convert the mask to binary
            mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
            grabcut_img = img * mask2[:, :, np.newaxis]
            
            # Convert the result back to PIL for further processing
            grabcut_img = cv2.cvtColor(grabcut_img, cv2.COLOR_BGR2RGB)
            grabcut_pil_img = Image.fromarray(grabcut_img)
            
            # Convert the image to bytes to send to Replicate
            img_byte_arr = io.BytesIO()
            grabcut_pil_img.save(img_byte_arr, format='PNG')
            img_byte_arr = img_byte_arr.getvalue()
            
            # Call Replicate API for sticker generation
            output = replicate.run(
                "fofr/sticker-maker:4acb778eb059772225ec213948f0660867b2e03f277448f18cf1800b96a65a1a",
                input={"image": img_byte_arr, "output_quality": 100},
                api_token=REPLICATE_API_KEY
            )
            
            # Send image to OpenAI for analysis
            openai.api_key = OPENAI_API_KEY
            openai_response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=(
                    "The cat is a...\n"
                    "Provide the following details:\n"
                    "Breed or Type: Specify the breed or type of cat if known.\n"
                    "Coat Texture and Length: Describe the texture and length of the cat’s fur.\n"
                    "Color and Patterns: Mention the color of the cat’s fur and any patterns or markings.\n"
                    "Body Shape and Size: Describe the cat’s overall body shape and size.\n"
                    "Pose: Describe the cat’s position.\n"
                    "Distinctive Features: Note any unique features.\n"
                    "Facial Features: Detail the cat’s head shape, eye size and color, ear size and placement, and any distinctive expressions or facial markings."
                ),
                max_tokens=150
            )
            
            response_data = {
                "trading_card": output[0],  
                "analysis": openai_response['choices'][0]['text'],
                "species": "Cat Species", 
            }
            responses.append(response_data)
        
        return JsonResponse({'status': 'success', 'cards': responses})
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=400)
