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
        deleteButton.addEventListener('click', function() {
            const restaurantId = item.getAttribute('data-id');
            deleteRestaurant(restaurantId, item);
        });
    });
});

function deleteRestaurant(id, element) {
    fetch('/delete_restaurant/' + id, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => {
        if (response.ok) {
            element.remove(); // Remove the restaurant item from the list
        } else {
            alert('Error deleting restaurant');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getCookie(name) {
    // ... existing getCookie function ...
}
