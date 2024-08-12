from rest_framework.decorators import api_view
from rest_framework.response import Response # type: ignore
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser

# Create your views here.
@api_view(['GET'])
def index(request):
    return Response({'msg': 'Welcome to the Cat-A-Log API!'})

csrf_exempt
@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_images(request):
    if request.method == 'POST':
        images = request.FILES.getlist('images')
        for image in images:
            with open(f'media/uploads/{image.name}', 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)
        return JsonResponse({'status': 'success', 'message': 'Images uploaded successfully.'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=400)
