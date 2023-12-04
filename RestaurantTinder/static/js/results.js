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
saveButton.addEventListener('click', function() {
    const currentBusiness = businesses[currentCard]; // Assuming you have the 'businesses' array available

    // AJAX call to Django view to save the restaurant
    fetch('/save-restaurant/', {
        method: 'POST',
        body: JSON.stringify({ 'business_id': currentBusiness.id }), // send the relevant restaurant ID or details
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken, // make sure to get the CSRF token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // handle response data
        showNextCard();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});



