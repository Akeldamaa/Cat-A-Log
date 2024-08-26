from rest_framework import serializers
from .models import Card

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'created_at', 'user', 'url', 'public_id', 'description'] 
        read_only_fields = ['id', 'created_at', 'user']

    