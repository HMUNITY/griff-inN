// JavaScript to handle habit interactions, word frequency counter, and emoji popups

document.addEventListener('DOMContentLoaded', function() {
    // Get all habit descriptions and checkboxes
    const habitCheckboxes = document.querySelectorAll('.habit-checkbox');
    const habitDescriptions = document.querySelectorAll('.habit-description');
    const emojiPopups = document.querySelectorAll('.emoji-popup');
    const wordCountElement = document.getElementById('wordCount');
    
    let wordFrequency = {};

    // Add event listener to each checkbox for tracking completion of habits
    habitCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const habitId = checkbox.id;
            const habitDescription = document.querySelector(`#${habitId} ~ .habit-header .habit-description`);

            // If the checkbox is checked, mark the habit as completed
            if (checkbox.checked) {
                habitDescription.style.textDecoration = 'line-through';
            } else {
                habitDescription.style.textDecoration = 'none';
            }

            // Update word frequency when habit description is checked
            updateWordFrequency(habitDescription.textContent);
        });
    });

    // Function to update the word frequency counter
    function updateWordFrequency(text) {
        const words = text.split(' ');

        words.forEach(word => {
            word = word.toLowerCase();
            if (word) {
                if (wordFrequency[word]) {
                    wordFrequency[word]++;
                } else {
                    wordFrequency[word] = 1;
                }
            }
        });

        // Update the word count display
        displayWordFrequency();
    }

    // Function to display word frequency on the page
    function displayWordFrequency() {
        let wordDisplay = '';
        for (let word in wordFrequency) {
            wordDisplay += `${word}: ${wordFrequency[word]} times<br>`;
        }
        wordCountElement.innerHTML = wordDisplay || 'No words yet...';
    }

    // Add hover effect to each habit's description for emoji popup
    habitDescriptions.forEach(description => {
        description.addEventListener('mouseover', function() {
            const emojiPopup = description.nextElementSibling.querySelector('.emoji-popup');
            const emojis = emojiPopup.getAttribute('data-hover');

            // Show emojis as popup when mouseover
            emojiPopup.textContent = emojis;
            emojiPopup.style.opacity = 1; // Make it visible
        });

        description.addEventListener('mouseout', function() {
            const emojiPopup = description.nextElementSibling.querySelector('.emoji-popup');

            // Hide emojis when mouse leaves the description
            emojiPopup.style.opacity = 0; // Make it disappear
        });
    });

    // Add transition effect for hovering and updating frequency stats
    const habits = document.querySelectorAll('.habit');
    habits.forEach(habit => {
        habit.addEventListener('transitionend', function() {
            habit.style.transition = 'all 0.3s ease';
        });
    });

    // Handling the date-based functionality (using current date for each habit)
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    console.log(`Today's date: ${formattedDate}`);

});
