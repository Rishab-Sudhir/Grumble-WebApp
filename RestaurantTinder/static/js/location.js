function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 }
    });

    var geocoder = new google.maps.Geocoder();
    var form = document.getElementById('location-form'); // Ensure you have the correct form ID

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        geocodeAddress(geocoder, map, form);
    });
}

function geocodeAddress(geocoder, resultsMap, form) {
    var address = document.getElementById('location-input').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
            // You can now submit the form or make an AJAX call with the geocoded coordinates
            // form.submit(); // Uncomment to submit the form
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

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
