from .serializers import UserRegistrationSerializer, UserLoginSerializer
from .utils import get_tokens_for_user, get_user_from_jwt
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate
from django.conf import settings
from django.contrib.auth import get_user_model
import jwt


class UserRegistrationAPIView(APIView):
	serializer_class = UserRegistrationSerializer
	authentication_classes = (JWTAuthentication,)
	permission_classes = (AllowAny,)

	def post(self, request):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid(raise_exception=True):
			new_user = serializer.save()
			if new_user:
				tokens = get_tokens_for_user(new_user)
				data = { 'tokens': tokens }
				response = Response(data, status=status.HTTP_201_CREATED)
				return response
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserLoginAPIView(APIView):
	serializer_class = UserLoginSerializer
	authentication_classes = (JWTAuthentication,)
	permission_classes = (AllowAny,)

	def post(self, request):
		email = request.data.get('email', None)
		user_password = request.data.get('password', None)

		if not email:
			raise AuthenticationFailed('Email is required.')

		if not user_password:
			raise AuthenticationFailed('Password is required.')

		user_instance = authenticate(email=email, password=user_password)

		if not user_instance:
			raise AuthenticationFailed('User not found.')

		if user_instance.is_active:
			tokens = get_tokens_for_user(user_instance)
			response = Response()
			response.data = {
				'tokens': tokens
			}
			return response

		return Response({
			'message': 'Something went wrong.'
		})



class UserViewAPI(APIView):
	authentication_classes = (JWTAuthentication,)
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		token = request.headers.get('Authorization').split(' ')[1]  
		user = get_user_from_jwt(token)
		print(user)

		user_model = get_user_model()
		user = user_model.objects.filter(pk=user.id).first()
		user_serializer = UserRegistrationSerializer(user)
		return Response({"user" : {'email': user_serializer.data['email']}})


class UserLogoutViewAPI(APIView):
	authentication_classes = (JWTAuthentication,)
	permission_classes = (AllowAny,)

	def get(self, request):
		user_token = request.COOKIES.get('access_token', None)
		if user_token:
			response = Response()
			response.delete_cookie('access_token')
			response.data = {
				'message': 'Logged out successfully.'
			}
			return response
		response = Response()
		response.data = {
			'message': 'User is already logged out.'
		}
		return response


