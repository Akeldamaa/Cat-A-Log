from rest_framework import serializers
from .models import Card

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'created_at', 'user', 'image', 'analysis', 'description'] 
        read_only_fields = ['id', 'created_at', 'user']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if instance.image and request:
            representation['image'] = request.build_absolute_uri(instance.image.url)
        return representation