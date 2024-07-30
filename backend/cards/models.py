from django.db import models

# Create your models here.
class CatImage(models.Model):
    image = models.ImageField(upload_to='cat_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
