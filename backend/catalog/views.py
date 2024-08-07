from rest_framework.decorators import api_view
from rest_framework.response import Response # type: ignore


# Create your views here.
@api_view(['GET'])
def index(request):
    return Response({'msg': 'Welcome to the Cat-A-Log API!'})