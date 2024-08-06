from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class User(AbstractUser):
	id = models.AutoField(primary_key=True)
	username = None
	email = models.EmailField(_("email address"), max_length=100, unique=True) 
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []
	objects = CustomUserManager()

	def __str__(self):
		return self.email


