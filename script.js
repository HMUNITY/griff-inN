// Array to hold the habit data, including the habit descriptions
const habits = [
    { id: 1, name: 'Drink Water', description: 'Drink at least 2 liters of water a day to stay hydrated and healthy.', emoji: '💧' },
    { id: 2, name: 'Exercise', description: 'Do at least 30 minutes of exercise daily to boost your mood and energy.', emoji: '💪' },
    { id: 3, name: 'Read a Book', description: 'Read for at least 15 minutes to improve your knowledge and relax.', emoji: '📚' }
];

// Track the checked status for each habit
const habitStatuses = {
    1: false,
    2: false,
    3: false
};

// Update word frequency counter
let wordFrequency = {};

// Function to toggle the habit's completion (checkbox clicked)
function toggleHabit(habitId) {
    const habit = habits.find(h => h.id === habitId);
    habitStatuses[habitId] = !habitStatuses[habitId];

    // Update the habit description visibility based on checkbox state
    const habitDescriptionBox = document.getElementById(`description${habitId}`);
    if (habitStatuses[habitId]) {
        habitDescriptionBox.style.textDecoration = 'line-through';
    } else {
        habitDescriptionBox.style.textDecoration = 'none';
    }

    // Update word frequency with the current habit's description
    updateWordFrequency(habit.description);
}

// Function to handle emoji popup on hover
function showEmojiPopup(habitId) {
    const emojiElement = document.getElementById(`emoji${habitId}`);
    emojiElement.style.display = 'block';
}

function hideEmojiPopup(habitId) {
    const emojiElement = document.getElementById(`emoji${habitId}`);
    emojiElement.style.display = 'none';
}

// Function to update word frequency based on habit description
function updateWordFrequency(description) {
    const words = description.split(/\s+/); // Split description into words
    words.forEach(word => {
        word = word.toLowerCase().replace(/[^\w\s]/g, ''); // Remove punctuation and make lowercase
        if (word.length > 0) {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
    });

    displayWordFrequency();
}

// Function to display word frequency
function displayWordFrequency() {
    const frequentWordsElement = document.getElementById('frequentWords');
    const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);
    const topWords = sortedWords.slice(0, 5); // Get the top 5 most frequent words
    frequentWordsElement.innerHTML = topWords.map(word => `${word[0]} (${word[1]})`).join(', ');
}

// Add event listeners to handle hover effects for habit cards
document.addEventListener('DOMContentLoaded', () => {
    habits.forEach(habit => {
        const habitElement = document.getElementById(`habit${habit.id}`);

        // Show emoji popup on hover
        habitElement.addEventListener('mouseenter', () => showEmojiPopup(habit.id));
        habitElement.addEventListener('mouseleave', () => hideEmojiPopup(habit.id));

        // Add event listener to update habit completion status
        const checkbox = document.getElementById(`habit${habit.id}`);
        checkbox.addEventListener('change', () => toggleHabit(habit.id));

        // Add date input event listener (optional feature)
        const dateInput = document.getElementById(`date${habit.id}`);
        dateInput.addEventListener('change', (e) => {
            console.log(`Habit ${habit.name} completed on ${e.target.value}`);
        });
    });
});
