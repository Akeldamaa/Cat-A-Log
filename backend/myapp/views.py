from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the myapp index.")


from django.http import JsonResponse
from .models import CatImage

def upload_image(request):
    if request.method == 'POST':
        image = request.FILES.get('file')
        cat_image = CatImage.objects.create(image=image)
        return JsonResponse({'message': 'File uploaded successfully', 'file': cat_image.image.url})
    return JsonResponse({'error': 'Invalid request'}, status=400)

