let currentCard = 0;
const cards = document.querySelectorAll('.restaurant-card');
const saveButton = document.getElementById('save');
const skipButton = document.getElementById('skip');

const showNextCard = () => {
    if (currentCard < cards.length - 1) {
        cards[currentCard].style.display = 'none';
        currentCard++;
        cards[currentCard].style.display = 'block';
    } else {
        // Hide buttons when there are no more cards
        saveButton.style.display = 'none';
        skipButton.style.display = 'none';
    }
};

// Show the first card on page load
if (cards.length > 0) {
    cards[0].style.display = 'block';
} else {
    // Hide buttons if there are no cards
    saveButton.style.display = 'none';
    skipButton.style.display = 'none';
}

// Bind the showNextCard function to your buttons
skipButton.addEventListener('click', showNextCard);

// Function to send data to Django backend
const saveRestaurant = (restaurantData) => {
    fetch('/location/save_restaurant/', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')  // Function to get CSRF token from cookies
        },
        body: JSON.stringify(restaurantData)
    })  
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // You can add logic here to display a success message to the user
    })
    .catch((error) => {
        console.error('Error:', error);
        // You can add logic here to display an error message to the user
    });
};

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

saveButton.addEventListener('click', () => {
    const currentRestaurantCard = cards[currentCard];

    // Extract data from the current card
    
    console.log(currentRestaurantCard.getAttribute("data-categories"));
    const restaurantData = {
        yelp_id: currentRestaurantCard.getAttribute("data-yelp-id"),
        name: currentRestaurantCard.getAttribute("data-name"),
        categories: currentRestaurantCard.getAttribute("data-categories"),
        rating: currentRestaurantCard.getAttribute("data-rating"),
        price: currentRestaurantCard.getAttribute("data-price"),
        phone: currentRestaurantCard.getAttribute("data-phone"),
        address: currentRestaurantCard.getAttribute("data-address"),
        image_url: currentRestaurantCard.getAttribute("data-image-url"),
        yelp_url: currentRestaurantCard.getAttribute("data-yelp-url")
    };

    saveRestaurant(restaurantData);

    showNextCard();
});

