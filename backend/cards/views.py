from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .models import CatImage
from .serializers import CatImageSerializer
from rest_framework import status


# Create your views here.
@api_view(['GET'])
def index(request):
    return Response({'msg': 'Welcome to the Cards API!'})

# def upload_image(request):
#     if request.method == 'POST':
#         image = request.FILES.get('file')
#         cat_image = CatImage.objects.create(image=image)
#         return JsonResponse({'message': 'File uploaded successfully', 'file': cat_image.image.url})
#     return JsonResponse({'error': 'Invalid request'}, status=400)

@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST':
        image = request.FILES.get('file')
        serializer = CatImageSerializer(image=image)
        return Response({'message': 'File uploaded successfully', 'file': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
