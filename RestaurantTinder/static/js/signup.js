document.addEventListener('DOMContentLoaded', function() {
    const closeButtons = document.querySelectorAll('#alert-box .close');

    // Function to Show Alert
    function showAlert() {
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('alert-box').style.display = 'block';
    }

    // Attach event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('main-content').style.display = 'block';
            document.getElementById('alert-box').style.display = 'none';
        });
    });

    // Example of triggering the alert - this could be adjusted based on your application's logic
    showAlert();
});