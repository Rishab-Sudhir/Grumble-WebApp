from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('get_location/', views.get_location, name='get_location'),
    path('search_restaurants/', views.search_restaurants, name='search_restaurants'),
    path('save_restaurant/', views.save_restaurant, name='save_restaurant'),
]

# Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

print(urlpatterns)

