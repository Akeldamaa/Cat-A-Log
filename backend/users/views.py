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


class UserRegistrationAPIView(APIView):
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
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			new_user = serializer.save()
			if new_user:
				tokens = get_tokens_for_user(new_user)
				data = { 'tokens': tokens }
				response = Response(data, status=status.HTTP_201_CREATED)
				return response
		default_errors = serializer.errors
		new_error = {}
		for field_name, field_errors in default_errors.items():
			new_error[field_name] = field_errors[0]
		return Response({'error': new_error}, status=status.HTTP_400_BAD_REQUEST)



class UserLoginAPIView(APIView):
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

		if not email:
			raise AuthenticationFailed('Email is required.')

		if not user_password:
			raise AuthenticationFailed('Password is required.')

		user_instance = authenticate(email=email, password=user_password)

		if not user_instance:
			raise AuthenticationFailed('Email or password is incorrect.')

		if user_instance.is_active:
			tokens = get_tokens_for_user(user_instance)
			response = Response(status=status.HTTP_200_OK)
			response.data = {
				'tokens': tokens
			}
			return response

		return Response({
			'error': 'Something went wrong.'
		})



class UserViewAPI(APIView):
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
	authentication_classes = (JWTAuthentication,)
	permission_classes = (IsAuthenticated,)

	@swagger_auto_schema(
		tags=['auth'],
		operation_description="Logout user",
		responses={
				200: "Success",
				401: "Unauthorized",
		},
	)
	def get(self, request):
		return Response({"message": "User logged out successfully."})


