let map, infoWindow, marker;

function initMap() {
    // Set a default center for the map
    const defaultLocation = { lat: -34.397, lng: 150.644 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: defaultLocation,
    });

    infoWindow = new google.maps.InfoWindow();

    // Try to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(userLocation);
                infoWindow.setPosition(userLocation);
                infoWindow.setContent('<div style="color: black;">Your location!</div>');
                infoWindow.open(map);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation, use default location
        handleLocationError(false, infoWindow, defaultLocation);
    }

    // Add click event listener to the map
    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });
}

// Function to update the 'Enter your location' input field
function updateLocationInput(latLng) {
    const latLngInput = document.getElementById('location-input'); // Replace with your input field ID
    latLngInput.value = latLng.lat() + ', ' + latLng.lng();
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

// The geocodeLatLng function (and other functions, if any) should be declared outside initMap
function geocodeLatLng(geocoder, map, latLng, inputField) {
    // Function implementation
    // ...
}

window.initMap = initMap;

// DOM Content Loaded event handling
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const alertBox = document.getElementById('alert-box');
    const alertMessageBox = document.getElementById('alert-message');
    const alertCloseButton = document.querySelector('#alert-box .close');

    // Function to Show Alert with a specific message
    function showAlert(message) {
        mainContent.style.display = 'none';
        alertMessageBox.textContent = message;
        alertBox.style.display = 'block';
    }

    // Function to Close Alert
    function closeAlert() {
        alertBox.style.display = 'none';
        mainContent.style.display = 'block';
    }

    // Attach event listener to alert box close button
    alertCloseButton.addEventListener('click', closeAlert);

    // Check for any initial messages and show the first one in the alert
    const initialMessages = document.querySelectorAll('.alert-dismissible');
    if (initialMessages.length > 0) {
        var firstMessageContent = initialMessages[0].querySelector('.message-content').textContent;
        showAlert(firstMessageContent);
        initialMessages[0].style.display = 'none'; // Hide the initial message from main content
    }
});