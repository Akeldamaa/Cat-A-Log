from django.urls import path

from . import views

urlpatterns = [
    path("media/upload/", views.upload_images, name="index"),
    
]