from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken


def get_tokens_for_user(user):
	refresh = RefreshToken.for_user(user)

	return {
			'refresh': str(refresh),
			'access': str(refresh.access_token),
	}


def get_user_from_jwt(token):
	try:
			jwt_authentication = JWTAuthentication()
			validated_token = jwt_authentication.get_validated_token(token)
			user = jwt_authentication.get_user(validated_token)
			return user
	except InvalidToken:
			return None