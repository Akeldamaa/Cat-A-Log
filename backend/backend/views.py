'''


from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
import os

@api_view(['GET'])
def index(request):
    return Response({'msg': 'Welcome to the Cat-A-Log API!'})

@csrf_exempt
@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_images(request):
    if request.method == 'POST':
        images = request.FILES.getlist('images')
        upload_dir = 'media/uploads/'
        
        # Ensure the directory exists
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        
        for image in images:
            with open(os.path.join(upload_dir, image.name), 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)
        
        return JsonResponse({'status': 'success', 'message': 'Images uploaded successfully.'})
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=400)
'''

from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def index(request):
    return Response({'msg': 'Welcome to the Cat-A-Log API!'})