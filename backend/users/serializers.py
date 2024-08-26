from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils import timezone


class UserRegistrationSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(max_length=100)
	password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
	class Meta:
		model = get_user_model()
		fields = ['email', 'password', "first_name", "last_name"]

	
	def create(self, validated_data):
		user_email = validated_data.get('email')
		first_name = validated_data.get('first_name')
		last_name = validated_data.get('last_name')
		user_password = validated_data.get('password', None)
		try:
			get_user_model().objects.get(email=user_email)
			raise serializers.ValidationError({'detail':'User with this email already exists'})
		except get_user_model().DoesNotExist:
			pass
		db_instance = self.Meta.model(email=user_email,first_name=first_name,last_name=last_name)
		# set password
		db_instance.set_password(user_password)
		# update last login
		db_instance.last_login = timezone.now()
		# save user
		db_instance.save()
		return db_instance


class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField(max_length=100)
	password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})

