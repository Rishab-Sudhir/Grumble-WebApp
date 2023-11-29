from django.shortcuts import redirect, render
from .forms import RestaurantSearchForm

def get_location(request):
    # logic to get the location or show location-related content
    return render(request, 'location/LocationMap.html')

def search_restaurants(request):
    if request.method == 'POST':
        form = RestaurantSearchForm(request.POST)
        if form.is_valid():
            # Use form.cleaned_data to access the validated data
            # Perform the search with the Yelp API using the form data
            # Render the results or redirect as necessary
            pass  # Replace with actual search logic and response
    else:
        form = RestaurantSearchForm()

    return render(request, 'location/search_restaurants.html', {'form': form})