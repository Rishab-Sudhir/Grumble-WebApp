document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const alertBox = document.getElementById('alert-box');
    const alertMessageBox = document.getElementById('alert-message');
    const alertCloseButton = document.querySelector('#alert-box .close');

    // Function to Show Alert with a specific message
    function showAlert(message) {
        mainContent.style.display = 'none'; // Hide main content
        alertMessageBox.textContent = message; // Set the message in the alert box
        alertBox.style.display = 'block'; // Show the alert box
    }

    // Function to Close Alert
    function closeAlert() {
        alertBox.style.display = 'none'; // Hide the alert box
        mainContent.style.display = 'block'; // Show the main content again
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
