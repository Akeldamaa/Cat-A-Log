from django.urls import path

from . import views

urlpatterns = [
     path('upload/', views.create_card, name='create_card'),
]