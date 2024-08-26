from django.db import models
from backend.settings import AUTH_USER_MODEL as User

# Create your models here.
class Card(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards')
    image = models.ImageField(upload_to='cards/images/', max_length=255, null=True, blank=True)
    analysis = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True) 

    def __str__(self):
        return f'Card for {self.user.first_name} {self.user.last_name} - {self.id}'
    
