let map, infoWindow, marker, geocoder;

function initMap() {
    const defaultLocation = { lat: 42.370530, lng: -71.091513 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: defaultLocation,
    });

    geocoder = new google.maps.Geocoder();
    infoWindow = new google.maps.InfoWindow();

    tryGeolocation();
    addMapClickListener();
}

function tryGeolocation() {
    showLoadingMessage("Generating your location...");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            positionSuccess,
            positionError,
            { timeout: 10000 } // Timeout after 10000 milliseconds
        );
    } else {
        positionError(false);
    }
}


function positionSuccess(position) {
    hideLoadingMessage();
    const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    };
    setMapToLocation(userLocation, 15);
    createOrUpdateMarker(userLocation);
    geocodeLatLng(geocoder, userLocation);
}

function positionError(browserHasGeolocation) {
    hideLoadingMessage();
    const errorMessage = browserHasGeolocation ?
                         'Error: The Geolocation service failed.' :
                         'Error: Your browser doesn\'t support geolocation.';
    console.error(errorMessage);
    infoWindow.setContent(errorMessage);
    infoWindow.setPosition(map.getCenter());
    infoWindow.open(map);
}

function hideLoadingMessage() {
    // Implement this function to hide the loading message or spinner
    document.getElementById('loadingMessage').style.display = 'none';
}

function showLoadingMessage(message) {
    // Implement this function to show a loading message or spinner
    // For example, update the text content of a designated div or show a modal/spinner
    document.getElementById('loadingMessage').textContent = message;
    document.getElementById('loadingMessage').style.display = 'block';
}


function setMapToLocation(location, zoomLevel) {
    map.setCenter(location);
    map.setZoom(zoomLevel);
}

function createOrUpdateMarker(position) {
    if (marker) {
        marker.setPosition(position);
    } else {
        marker = new google.maps.Marker({
            position: position,
            map: map,
        });
    }
}

function addMapClickListener() {
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



function geocodeLatLng(geocoder, latLng) {
    geocoder.geocode({ 'location': latLng }, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                document.getElementById('location-input').value = results[0].formatted_address;
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : 'Error: Your browser does not support geolocation.'
    );
    infoWindow.open(map);
}

// DOM Content Loaded event handling
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const alertBox = document.getElementById('alert-box');
    const alertMessageBox = document.getElementById('alert-message');
    const alertCloseButton = document.querySelector('#alert-box .close');

    function showAlert(message) {
        mainContent.style.display = 'none';
        alertMessageBox.textContent = message;
        alertBox.style.display = 'block';
    }

    function closeAlert() {
        alertBox.style.display = 'none';
        mainContent.style.display = 'block';
    }

    alertCloseButton.addEventListener('click', closeAlert);

    const initialMessages = document.querySelectorAll('.alert-dismissible');
    if (initialMessages.length > 0) {
        var firstMessageContent = initialMessages[0].querySelector('.message-content').textContent;
        showAlert(firstMessageContent);
        initialMessages[0].style.display = 'none';
    }
});

window.initMap = initMap;
