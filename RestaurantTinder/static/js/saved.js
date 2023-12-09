document.addEventListener('DOMContentLoaded', function() {
    // Handle detail view toggling
    document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', function() {
            const details = button.closest('.restaurant-item').querySelector('.restaurant-details');
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
            button.textContent = details.style.display === 'none' ? 'More Details' : 'Less Details';
        });
    

    // Handle delete functionality
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const restaurantItem = button.closest('.restaurant-item');
            const restaurantId = restaurantItem.getAttribute('data-id');
            deleteRestaurant(restaurantId, restaurantItem);
        });

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
