document.addEventListener('DOMContentLoaded', function() {
    // Handle detail view toggling
    document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', function() {
            const details = button.closest('.restaurant-item').querySelector('.restaurant-details');
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
            button.textContent = details.style.display === 'none' ? 'More Details' : 'Less Details';
        });
    });
    

    // Handle delete functionality
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const restaurantItem = button.closest('.restaurant-item');
            const restaurantId = restaurantItem.getAttribute('data-id');
            deleteRestaurant(restaurantId, restaurantItem);
        });
    });

});