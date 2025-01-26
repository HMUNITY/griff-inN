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
    archiveList.innerHTML = habits.map(habit => 
        `<div class="archive-item" style="background-color: ${getColorForEmoji(habit.emoji)};">
            <div class="habit-description">
                <p><strong>Data:</strong> ${habit.date}</p>
                <p><strong>Duration:</strong> ${habit.duration} min</p>
                <p><strong>Description:</strong> ${habit.description}</p>
                <p><strong>Emoji:</strong> <span class="habit-emoji">${habit.emoji}</span></p>
                <p><strong>Link:</strong> <a href="${habit.link}" target="_blank">${habit.link}</a></p>
            </div>
        </div>`
    ).join('');
}

// Helper function to assign color based on emoji
function getColorForEmoji(emoji) {
    const colors = {
        "😊": "#ffeb3b",
        "😞": "#f44336",
        "😀": "#4caf50"
    };
    return colors[emoji] || "#fff";
}

// Handle new habit submission
smokeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const habitDesc = document.getElementById('habit-desc').value.trim();
    const habitDate = document.getElementById('habit-date').value;
    const habitDuration = document.getElementById('habit-duration').value;
    const habitEmoji = document.getElementById('habit-emoji').value.trim();
    const habitComment = document.getElementById('habit-comment').value.trim();
    const habitLink = document.getElementById('habit-link').value.trim();

    if (habitDesc && habitDate && habitDuration && habitEmoji) {
        const newHabit = {
            description: habitDesc,
            date: habitDate,
            duration: habitDuration,
            emoji: habitEmoji,
            link: habitLink
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

// Hover effect to show emoji
document.addEventListener('mouseover', function (event) {
    if (event.target.classList.contains('archive-item')) {
        const emoji = event.target.querySelector('.habit-emoji').textContent;
        const emojiPop = document.createElement('div');
        emojiPop.classList.add('emoji-pop');
        emojiPop.textContent = emoji;
        event.target.appendChild(emojiPop);

        // Remove emoji pop when mouse leaves
        event.target.addEventListener('mouseleave', function () {
            emojiPop.remove();
        });
    }
});
