from django.contrib import admin
from .models import SavedRestaurant

# Define an admin class if you need to customize the admin interface
class SavedRestaurantAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'yelp_id', 'price', 'rating')  # Customize the columns displayed
    search_fields = ('user','name', 'categories')  # Add search functionality
    list_filter = ('user', 'price', 'rating')  # Add filters

# Register your models here.
admin.site.register(SavedRestaurant, SavedRestaurantAdmin)