from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserRegistrationSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(max_length=100)
	password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
	class Meta:
		model = get_user_model()
		fields = ['email', 'password']

	
	def create(self, validated_data):
		user_email = validated_data.get('email')
		user_password = validated_data.get('password', None)
		try:
			get_user_model().objects.get(email=user_email)
			raise serializers.ValidationError({'detail':'User with this email already exists'})
		except get_user_model().DoesNotExist:
			pass
		db_instance = self.Meta.model(email=user_email)
		db_instance.set_password(user_password)
		db_instance.save()
		return db_instance


class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField(max_length=100)
	password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})

