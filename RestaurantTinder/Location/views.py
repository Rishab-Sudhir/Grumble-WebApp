from django.shortcuts import render


def get_location(request):
    # logic to get the location or show location-related content
    return render(request, 'location/get_location.html')