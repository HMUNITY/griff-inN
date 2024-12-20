// Initialize habit list from localStorage if available
let habitList = JSON.parse(localStorage.getItem('habitList')) || [];
const habitInput = document.getElementById('habit-input');
const habitListSection = document.getElementById('habit-list');
const totalHabits = document.getElementById('total-habits');
const completedHabits = document.getElementById('completed-habits');

// Function to render habits from habitList
function renderHabits() {
    habitListSection.innerHTML = ''; // Clear current habit list
    habitList.forEach((habit, index) => {
        const li = document.createElement('li');
        li.classList.add('habit-item');

        // Habit item HTML structure with extra punctuation field
        li.innerHTML = `
            <input type="checkbox" class="habit-checkbox" ${habit.completed ? 'checked' : ''} onclick="toggleCompleted(${index})">
            <span class="habit-name">${habit.name}</span>
            
            <!-- Extra punctuation/comments section -->
            <div class="habit-comments-container">
                <textarea class="habit-comments" placeholder="Add a note..." onchange="updateComments(${index}, this.value)">${habit.comments || ''}</textarea>
            </div>
        `;

        habitListSection.appendChild(li);
    });

    // Update the total and completed habits counters
    totalHabits.textContent = habitList.length;
    completedHabits.textContent = habitList.filter(habit => habit.completed).length;

    // Save habit list to localStorage
    localStorage.setItem('habitList', JSON.stringify(habitList));
}

// Toggle completion status of a habit
function toggleCompleted(index) {
    habitList[index].completed = !habitList[index].completed;
    renderHabits();
}

// Update habit comments (extra punctuation)
function updateComments(index, newComments) {
    habitList[index].comments = newComments;
    renderHabits();
}

// Add a new habit to the list
function addHabit() {
    const habitName = habitInput.value.trim();
    if (habitName === '') return;

    // Create a new habit object with an empty comment field
    const newHabit = {
        name: habitName,
        completed: false,
        comments: ''
    };

    // Add the new habit to the habit list
    habitList.push(newHabit);

    // Clear the input field and re-render the list
    habitInput.value = '';
    renderHabits();
}

// Event listener for adding a habit when the user presses Enter
habitInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addHabit();
    }
});

// Add habit when button is clicked
document.getElementById('add-habit-button').addEventListener('click', addHabit);

// Initial render when the page loads
renderHabits();
