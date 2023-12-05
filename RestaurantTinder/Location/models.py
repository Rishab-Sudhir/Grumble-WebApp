from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField

class SavedRestaurant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    yelp_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    image_url = models.URLField()
    yelp_url = models.URLField()
    categories = JSONField()  # Store categories as JSON
    rating = models.FloatField()
    address = models.TextField()
    phone = models.CharField(max_length=50)
    price = models.CharField(max_length=50)

    def __str__(self):
        return self.name
