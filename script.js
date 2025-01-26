// Get DOM elements
const smokeForm = document.getElementById('smokeForm');
const archiveList = document.getElementById('archive-list');
const frequentWords = document.getElementById('frequentWords');

// Helper function to get data from localStorage
function getDataFromStorage() {
    const storedData = localStorage.getItem('smokeHabits');
    return storedData ? JSON.parse(storedData) : [];
}

// Helper function to save data to localStorage
function saveDataToStorage(data) {
    localStorage.setItem('smokeHabits', JSON.stringify(data));
}

// Helper function to delete habit by index
function deleteHabit(index) {
    const habits = getDataFromStorage();
    habits.splice(index, 1); // Remove the habit from the array
    saveDataToStorage(habits); // Save the updated list back to localStorage
    displayArchive(habits); // Update the UI
    updateWordFrequencyCounter(habits); // Recalculate word frequency
}

// Helper function to update the word frequency counter
function updateWordFrequencyCounter(habits) {
    const wordCount = {};

    habits.forEach(habit => {
        const words = habit.description.split(' ');
        words.forEach(word => {
            word = word.toLowerCase().replace(/[^\w\s]/gi, ''); // Remove punctuation and convert to lowercase
            if (word) {
                wordCount[word] = (wordCount[word] || 0) + 1;
            }
        });
    });

    // Sort words by frequency
    const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);

    frequentWords.innerHTML = sortedWords
        .slice(0, 10) // Show top 10 most frequent words
        .map(([word, count]) => `<p><strong>${word}</strong>: ${count}</p>`)
        .join('');
}

// Display habit archive
function displayArchive(habits) {
    archiveList.innerHTML = habits.map((habit, index) => 
        `<div class="habit-item">
            <div class="habit-description">
                <p><strong>Date:</strong> ${habit.date}</p>
                <p><strong>Duration:</strong> ${habit.duration} min</p>
                <p><strong>Description:</strong> ${habit.description}</p>
                <p><strong>Emoji:</strong> <span class="habit-emoji">${habit.emoji}</span></p>
                <button class="delete-btn" onclick="deleteHabit(${index})">Delete</button>
            </div>
        </div>`
    ).join('');
}

// Handle new habit submission
smokeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const habitDesc = document.getElementById('habit-desc').value.trim();
    const habitDate = document.getElementById('habit-date').value;
    const habitDuration = document.getElementById('habit-duration').value;
    const habitEmoji = document.getElementById('habit-emoji').value.trim();

    if (habitDesc && habitDate && habitDuration && habitEmoji) {
        const newHabit = {
            description: habitDesc,
            date: habitDate,
            duration: habitDuration,
            emoji: habitEmoji
        };

        // Retrieve existing habits from localStorage or start fresh
        const habits = getDataFromStorage();

        // Add new habit to the list
        habits.push(newHabit);

        // Save updated habits to localStorage
        saveDataToStorage(habits);

        // Update the word frequency counter and archive display
        updateWordFrequencyCounter(habits);
        displayArchive(habits);

        // Clear the form inputs
        smokeForm.reset();
    } else {
        alert('Please fill out all fields');
    }
});

// Load habits from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    const habits = getDataFromStorage();

    // Update the word frequency counter and archive display
    updateWordFrequencyCounter(habits);
    displayArchive(habits);
});
