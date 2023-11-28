from django.shortcuts import redirect, render


def get_location(request):
    # logic to get the location or show location-related content
    return render(request, 'Location/LocationMap.html')

def search_restaurants(request):
    pass
#    if request.method == 'POST':
#       # Extract data from form submission
#        radius = request.POST.get('radius')
#        location = request.POST.get('location')
        
        # You can now use the 'radius' and 'location' variables to make your API call and gather data

        # After getting the data, you would typically render a results page
#        return # render(request, 'Location/ResultsPage.html', {'data': data})
#    else:
        # If it's not a POST request, redirect back to the get_location view
#        return # redirect('get_location')