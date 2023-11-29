from django.urls import path
from . import views

urlpatterns = [
    path('get_location/', views.get_location, name='get_location'),
    path('search_restaurants/', views.search_restaurants, name='search_restaurants'),
]