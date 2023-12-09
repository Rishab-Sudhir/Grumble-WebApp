from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('signup', views.signup, name = "signup"),
    path('signin', views.signin, name = "signin"),
    path('signout', views.signout, name = "signout"),
    path('activate/<uidb64>/<token>', views.activate, name = "activate"),
    path('social/signup/', views.signup_redirect, name='signup_redirect'),
    path('saved_restaurants/', views.saved_restaurants, name='saved_restaurants'),
    path('saved_restaurants/delete_saved_restaurant/', views.delete_saved_restaurant, name='delete_saved_restaurant'),
]
