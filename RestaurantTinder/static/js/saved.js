document.addEventListener('DOMContentLoaded', function() {
    // Iterate over each restaurant item
    document.querySelectorAll('.restaurant-item').forEach(item => {
        const detailsButton = item.querySelector('.details-button');
        const deleteButton = item.querySelector('.delete-button');

        // Toggle details view
        detailsButton.addEventListener('click', function() {
            const details = item.querySelector('.restaurant-details');
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
            detailsButton.textContent = details.style.display === 'none' ? 'More Details' : 'Less Details';
        });

        // Delete functionality
        deleteButton.addEventListener('click', function() {
            const yelpId = item.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this restaurant?')) {
                deleteRestaurant(yelpId, item);
            }
        });
    });
});

function deleteRestaurant(yelpId, itemElement) {
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
            itemElement.remove();
        } else {
            alert('Error: ' + data.msg);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the restaurant.');
    });
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
