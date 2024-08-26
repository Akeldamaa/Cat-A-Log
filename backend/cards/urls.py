from django.urls import path

from . import views

urlpatterns = [
     path('user/', views.get_user_cards, name='get_user_cards'),
     path('upload/', views.create_card, name='create_card'),
]