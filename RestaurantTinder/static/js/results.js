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
saveButton.addEventListener('click', () => {
    // Implement save logic here
    showNextCard();
});
