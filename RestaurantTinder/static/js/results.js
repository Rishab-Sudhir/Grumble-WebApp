let currentCard = 0;
const cards = document.querySelectorAll('.restaurant-card');
const saveButton = document.getElementById('save');
const skipButton = document.getElementById('skip');
const endOfListContainer = document.getElementById('end-of-list'); // Add this

const container = document.querySelector('.container'); // Add this

const showNextCard = () => {
    if (currentCard < cards.length - 1) {
        cards[currentCard].style.display = 'none';
        currentCard++;
        cards[currentCard].style.display = 'block';
    } else {
        saveButton.style.display = 'none';
        skipButton.style.display = 'none';
        if (endOfListContainer) {
            endOfListContainer.style.display = 'flex'; // Changed to flex for centering
            container.classList.add('blur'); // Add blur effect to the container
        }
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


function updateYelpRatings() {
    // Define the base path to the star images
    const basePath = '/static/assets/yelp_stars/web_and_ios/small/';

    // Select all restaurant cards
    const restaurantCards = document.querySelectorAll('.restaurant-card');

    restaurantCards.forEach(card => {
        // Get the Yelp rating from the data attribute
        const yelpRating = parseFloat(card.getAttribute('data-rating'));

        // Determine the filename of the star image
        const imageName = getStarImageName(yelpRating);

        // Construct the full path to the star image
        const imagePath = basePath + imageName;

        // Find the element where the star image should be displayed
        // Adjust the selector if your structure is different
        const ratingElement = card.querySelector('.yelp-rating-img');

        // Set the image source
        if (ratingElement) {
            ratingElement.src = imagePath;
        }
    });
}

function getStarImageName(rating) {
    // Round the rating to the nearest half
    const roundedRating = Math.round(rating * 2) / 2;
    let imageName;

    // Construct the image file name
    if (roundedRating % 1 === 0) {
        imageName = `small_${roundedRating}@2x.png`;
    } else {
        imageName = `small_${Math.floor(roundedRating)}_half@2x.png`;
    }

    return imageName;
}


// // Rishab's Function to send data to Django backend
// const saveRestaurant = (restaurantData) => {
//     fetch('/location/save_restaurant/', { 
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': getCookie('csrftoken')  // Function to get CSRF token from cookies
//         },
//         body: JSON.stringify(restaurantData)
//     })  
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         // You can add logic here to display a success message to the user
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         // You can add logic here to display an error message to the user
//     });
// };


// Function to display a message in the center of the screen with a blurred background
function displayMessage(message, isSuccess = true) {
    // Create an overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // Create a message box
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-box ${isSuccess ? 'success' : 'error'}`;
    messageDiv.innerHTML = `<span>${message}</span>`;

    // Optionally add a link to view saved restaurants
    if (isSuccess) {
        const viewSavedLink = document.createElement('a');
        viewSavedLink.href = '/saved_restaurants';  // Update with the correct path to your saved restaurants page
        viewSavedLink.textContent = '\nView Saved Restaurants';
        viewSavedLink.className = 'view-saved-link';
        messageDiv.appendChild(viewSavedLink);
    }

    // Create a close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'close-button';
    closeButton.onclick = function() {
        document.body.removeChild(overlay);
    };

    messageDiv.appendChild(closeButton);
    overlay.appendChild(messageDiv);
    document.body.appendChild(overlay);

    // Automatically close the message after 10 seconds
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
    }, 10000);
}



// Function to send data to Django backend
const saveRestaurant = (restaurantData) => {
    fetch('/location/save_restaurant/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(restaurantData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'already_saved') {
            displayMessage('Already saved.');
        } else {
            displayMessage('Successfully added.');
        }
        console.log('Success:', data);
    })
    .catch((error) => {
        displayMessage('Error occurred.', false);
        console.error('Error:', error);
    });
};

// Execute the function when the document is fully loaded
document.addEventListener('DOMContentLoaded', updateYelpRatings);

// Function to display messages to the user
// function displayMessage(message, type) {
//     let messageContainer = document.querySelector('.message-container');

//     // If the container doesn't exist, create it
//     if (!messageContainer) {
//         messageContainer = document.createElement('div');
//         messageContainer.classList.add('message-container');
//         document.body.appendChild(messageContainer);

//         const closeButton = document.createElement('button');
//         closeButton.textContent = 'X';
//         closeButton.classList.add('message-close');
//         closeButton.onclick = () => messageContainer.classList.remove('show');
//         messageContainer.appendChild(closeButton);
//     }

//     messageContainer.textContent = message + messageContainer.textContent; // Preserve close button text
//     messageContainer.classList.add(type, 'show');

//     // Automatically close after 10 seconds
//     setTimeout(() => {
//         messageContainer.classList.remove('show');
//     }, 10000); // 10 seconds before message disappears
// }


