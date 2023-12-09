document.addEventListener('DOMContentLoaded', function() {
    const detailButtons = document.querySelectorAll('.details-button');

    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const restaurantItem = button.closest('.restaurant-item');
            const details = restaurantItem.querySelector('.restaurant-details');

            // Create an overlay
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);

            // Expand details
            details.classList.add('expanded');

            // Clicking on the overlay closes expanded details
            overlay.addEventListener('click', function() {
                details.classList.remove('expanded');
                document.body.removeChild(overlay);
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const restaurantItems = document.querySelectorAll('.restaurant-item');

    restaurantItems.forEach(item => {
        const detailsButton = item.querySelector('.details-button');
        const deleteButton = item.querySelector('.delete-button');
        const details = item.querySelector('.restaurant-details');

        // Toggle details view
        detailsButton.addEventListener('click', function() {
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
        });

        // Delete functionality
        deleteButton.addEventListener('click', function(event) {
            if (event.target.classList.contains('delete-button')) {
                const yelpId = event.target.getAttribute('data-yelp-id');
                deleteRestaurant(yelpId);
            }
        });
    });
});


function deleteRestaurant(yelpId) {
    fetch('delete_saved_restaurant/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') 
        },
        body: JSON.stringify({ yelp_id: yelpId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Restaurant deleted');
            // Optionally remove the restaurant from the DOM
            // document.querySelector(`[data-yelp-id="${yelpId}"]`).remove();
        } else {
            console.error('Error:', data.msg);
        }
    })
    .catch(error => console.error('Error:', error));
}


// Function to get CSRF token from cookies (required for POST requests)
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};