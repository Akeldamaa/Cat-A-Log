from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
import os


from django.urls import path
from . import views



@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_images(request):
    if request.method == 'POST':
        images = request.FILES.getlist('images')
        for image in images:
            
            file_path = f'media/uploads/{image.name}'
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)
        return JsonResponse({'status': 'success', 'message': 'Images uploaded successfully.'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=400)
