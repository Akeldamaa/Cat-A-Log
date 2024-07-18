from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('upload_image/', views.upload_image, name='upload_image'),
    path('analyze_image/', views.analyze_image, name='analyze_image'),
    path('mint_nft/', views.mint_nft, name='mint_nft'),
]
