from django.contrib import admin
from django.urls import path, include
from myapp import views

urlpatterns = [
    path('', views.index, name="index"),
    path('admin/', admin.site.urls),
    path('api/', include('myapp.urls')),
    path('login/', views.login, name="login"),
    path('signup/', views.signup, name="signup"),
    path('user-dashboard/', views.user_dashboard, name="user-dashboard"),
    path('collection/', views.collection, name="collection"),
]
