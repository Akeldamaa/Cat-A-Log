from django.db import models

# Create your models here.
# myapp/models.py
class django_modle_1(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
