from django.shortcuts import redirect, render
import requests
from .forms import RestaurantSearchForm
from django.contrib import messages
from .utils import call_yelp_api


def get_location(request):
    if request.method == 'POST':
        location_query = request.POST.get('location')
        if request.POST.get('radius') == None:
            radius = 1
        else:
            radius = request.POST.get('radius')

        # Call Google Maps Geocoding API
        google_maps_url = 'https://maps.googleapis.com/maps/api/geocode/json'

        google_maps_url = 'https://maps.googleapis.com/maps/api/geocode/json'
        params = {
            'address': location_query,
            'key': "AIzaSyBvnv5Y_syGDIt6LbOCHzfBWiObd7Rv-WU"
        }
        response = requests.get(google_maps_url, params=params)
        if response.status_code == 200:
            geocode_result = response.json()
            if geocode_result['results']:
                latitude = geocode_result['results'][0]['geometry']['location']['lat']
                longitude = geocode_result['results'][0]['geometry']['location']['lng']
                
                # Store coordinates and radius in session
                request.session['latitude'] = latitude
                request.session['longitude'] = longitude
                request.session['radius'] = int(float(radius) * 1609.34)  # Convert miles to meters for Yelp API


                
                return redirect('search_restaurants')  # URL name for the second page
            else:
                messages.error(request, "Could not find the location. Please try again.")
                return redirect('get_location')
        else:
            # API call failed
            messages.error(request, "There was an error processing your request. Please try again.")
            return redirect('get_location')

    # If not POST or there was an error, render the page with the form again
    return render(request, 'location/LocationMap.html')

def search_restaurants(request):
    if request.method == 'POST':
        form = RestaurantSearchForm(request.POST)
        if form.is_valid():
            params = {
                'latitude': request.session.get('latitude'),
                'longitude': request.session.get('longitude'),
                'radius': request.session.get('radius'),
                'categories': form.cleaned_data.get('category'),
                'locale': 'en_US',
                'price': form.cleaned_data.get('price'),
                'open_now': form.cleaned_data.get('open_now'),
                'sort_by': 'best_match',
                'limit': 20
            }
            print("Yelp API call parameters:", params)
            businesses = call_yelp_api(params)
            for business in businesses:
                business['distance'] = business['distance'] / 1609.34 #converting to miles
            return render(request, 'location/display_results.html', {'businesses': businesses})
    else:
        form = RestaurantSearchForm()

    return render(request, 'location/search_restaurants.html', {'form': form})