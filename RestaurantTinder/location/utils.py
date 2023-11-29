import requests
from django.core.cache import cache

# Function to get categories from the Yelp API
def get_yelp_categories():
    # Check if the categories are already in cache
    categories = cache.get('yelp_categories')
    if not categories:
        url = "https://api.yelp.com/v3/categories?locale=en_US"
        headers = {
            "Authorization": "Bearer 1xl8I59LYFDh02JClKR5W5CdYO_GytsV2JTaOnrmKrANWbPImF_YjMxfuBhfuLz9aoevKb_xXoBIA7uZmqweaKEXoWHl54NA3TZ2K87O6kToU8wr-vPvsysGOK5nZXYx"
        }
        response = requests.get(url, headers=headers)
        print("Status Code:", response.status_code)  # Print status code
        if response.status_code == 200:
            categories_data = response.json()
            # Extract categories and subcategories
            food_categories = [cat for cat in categories_data['categories']if 'restaurants' in cat.get('parent_aliases', [])]
            categories = [(cat['alias'], cat['title']) for cat in food_categories]
            #alias refers to the name used for parsing, and title is human readable
            # Cache the categories for 24 hours
            cache.set('yelp_categories', categories, timeout=60*60*24)
        else: 
            categories = [(None, None)]  # In case the request fails, return an empty list

    return categories
