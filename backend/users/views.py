from .serializers import UserRegistrationSerializer, UserLoginSerializer
from .utils import get_tokens_for_user, get_user_from_jwt
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema 
import requests
from django.utils import timezone
from backend.settings import SITE_URL



class UserRegistrationAPIView(APIView):
	"""Register User"""
	serializer_class = UserRegistrationSerializer
	authentication_classes = (JWTAuthentication,)
	permission_classes = (AllowAny,)

	@swagger_auto_schema(
		tags=['auth'],
		operation_description="Register user",
		responses={
				201: "Created",
				400: "Bad Request",
		},
		request_body=UserRegistrationSerializer
	)

	def post(self, request):
		data = {
			'email': request.data.get('email'),
			'password': request.data.get('password'),
			'first_name': request.data.get('firstName') if request.data.get('firstName') else request.data.get('first_name'),
			'last_name': request.data.get('lastName') if request.data.get('lastName') else request.data.get('last_name')
		}
		# validate data
		serializer = self.serializer_class(data=data)
		if serializer.is_valid():
			# save user
			new_user = serializer.save()
			if new_user:
				# generate access and refresh tokens and return response
				tokens = get_tokens_for_user(new_user)
				response = Response(status=status.HTTP_201_CREATED)
				response.set_cookie('refresh_token', tokens['refresh'], httponly=True)
				response.data = {
					'accessToken': tokens['access']
				}
				return response
		# error handling
		default_errors = serializer.errors
		new_error = {}
		for field_name, field_errors in default_errors.items():
			new_error[field_name] = field_errors[0]
		return Response({'error': new_error}, status=status.HTTP_400_BAD_REQUEST)



class UserLoginAPIView(APIView):
	"""Login User"""
	serializer_class = UserLoginSerializer
	authentication_classes = (JWTAuthentication,)
	permission_classes = (AllowAny,)

	@swagger_auto_schema(
		tags=['auth'],
		operation_description="Login user",
		responses={
				200: "Success",
				400: "Bad Request",
				401: "Unauthorized",
		},
		request_body=UserLoginSerializer
  )

	def post(self, request):
		email = request.data.get('email', None)
		user_password = request.data.get('password', None)
		# validate data
		if not email:
			raise AuthenticationFailed('Email is required.')

		if not user_password:
			raise AuthenticationFailed('Password is required.')
		# authenticate user
		user_instance = authenticate(email=email, password=user_password)

		if not user_instance:
			raise AuthenticationFailed('Email or password is incorrect.')

		if user_instance.is_active:
			# update last login and save
			user_instance.last_login = timezone.now()
			user_instance.save()
			# generate access and refresh tokens and return response
			tokens = get_tokens_for_user(user_instance)
			response = Response(status=status.HTTP_200_OK)
			response.set_cookie('refresh_token', tokens['refresh'], httponly=True)
			response.data = {
				'accessToken': tokens['access']
			}
			return response
		# error handling
		return Response({
			'error': 'Something went wrong.'
		})



class UserViewAPI(APIView):
	"""View current logged in user"""
	authentication_classes = (JWTAuthentication,)
	permission_classes = (IsAuthenticated,)

	@swagger_auto_schema(
		tags=['auth'],
		operation_description="Get user details",
		responses={
				200: "Success",
				401: "Unauthorized",
		},
	)

	def get(self, request):
		token = request.headers.get('Authorization').split(' ')[1]  
		user = get_user_from_jwt(token)

		user_model = get_user_model()
		user = user_model.objects.filter(pk=user.id).first()
		user_serializer = UserRegistrationSerializer(user)
		return Response({"user" : {'email': user_serializer.data['email']}})


class UserLogoutViewAPI(APIView):
	"""Logout User"""
	authentication_classes = (JWTAuthentication,)
	permission_classes = (AllowAny,)

	@swagger_auto_schema(
		tags=['auth'],
		operation_description="Logout user",
		responses={
				200: "Success",
		},
	)

	def get(self, request):
		response = Response(status=status.HTTP_200_OK)
		response.delete_cookie('refresh_token')
		response.data = {
			'message': 'User logged out successfully.'
		}
		return response
		
	

class UserRefreshTokenViewAPI(APIView):
	"""Create a new access token for user"""
	authentication_classes = (JWTAuthentication,)
	permission_classes = (AllowAny,)

	@swagger_auto_schema(
		tags=['auth'],
		operation_description="Refresh tokens",
		responses={
				200: "Success",
				401: "Unauthorized",
		},
	)

	def get(self, request):
		# check if a refresh token is available
		token = request.COOKIES.get('refresh_token')
		if not token:
			raise AuthenticationFailed('Authentication credentials were not provided.')
		# generate a new access token
		data = {
			'refresh': token
		}
		token_response = requests.post(
			f"{SITE_URL}/api/token/refresh/",
			data=data
    )

		if token_response.status_code == 401:
			raise AuthenticationFailed('Invalid refresh token.')
		# return token in response
		token = token_response.json()
		response = Response(status=status.HTTP_200_OK)
		response.data = {
			'accessToken': token['access']
		}
		return response
