let map, marker, geocoder;

function initMap() {
    const defaultLocation = { lat: -34.397, lng: 150.644 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: defaultLocation,
    });

    geocoder = new google.maps.Geocoder();

    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });
}

function placeMarkerAndPanTo(latLng, map) {
    if (marker) {
        marker.setPosition(latLng);
    } else {
        marker = new google.maps.Marker({
            position: latLng,
            map: map,
        });
    }

    map.panTo(latLng);
    geocodeLatLng(geocoder, latLng);
}