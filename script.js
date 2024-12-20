// Initialize empty habit list if none exists in localStorage
let habitList = JSON.parse(localStorage.getItem('habitList')) || [];
const habitInput = document.getElementById('habit-input');
const habitListSection = document.getElementById('habit-list');
const totalHabits = document.getElementById('total-habits');
const completedHabits = document.getElementById('completed-habits');

// Function to render habits from habitList
function renderHabits() {
    habitListSection.innerHTML = ''; // Clear the habit list
    habitList.forEach((habit, index) => {
        // Create a new list item for each habit
        const li = document.createElement('li');
        li.classList.add('habit-item');
        
        li.innerHTML = `
            <div class="habit-content">
                <input type="checkbox" class="habit-checkbox" ${habit.completed ? 'checked' : ''} onclick="toggleCompleted(${index})">
                <span class="habit-name">${habit.name}</span>
                <input type="number" class="progress-input" value="${habit.progress}" min="0" max="100" onchange="updateProgress(${index}, event)">
                <span class="progress-text">${habit.progress}%</span>
                <textarea class="habit-comment" placeholder="Add a comment" oninput="updateComment(${index}, event)">${habit.comment}</textarea>
            </div>
        `;
        
        habitListSection.appendChild(li);
    });

    // Update the total and completed habits
    totalHabits.textContent = habitList.length;
    completedHabits.textContent = habitList.filter(habit => habit.completed).length;
    
    // Save habitList to localStorage
    localStorage.setItem('habitList', JSON.stringify(habitList));
}

// Function to add a new habit
function addHabit() {
    const habitName = habitInput.value.trim();
    if (habitName === '') return;

    // Create a new habit object
    const newHabit = {
        name: habitName,
        progress: 0,
        completed: false,
        comment: ''
    };

    // Add the new habit to the habitList array
    habitList.push(newHabit);

    // Clear input field
    habitInput.value = '';

    // Re-render the habit list
    renderHabits();
}

// Function to toggle habit completion
function toggleCompleted(index) {
    habitList[index].completed = !habitList[index].completed;

    // Re-render the list to reflect the completion status
    renderHabits();
}

// Function to update the progress of a habit
function updateProgress(index, event) {
    const progress = event.target.value;
    habitList[index].progress = progress;

    // Update the progress text next to the progress input
    const progressText = event.target.nextElementSibling;
    progressText.textContent = `${progress}%`;

    // Re-render the habit list
    renderHabits();
}

// Function to update the comment of a habit
function updateComment(index, event) {
    const comment = event.target.value;
    habitList[index].comment = comment;

    // Save the habit list to localStorage
    localStorage.setItem('habitList', JSON.stringify(habitList));
}

// Initial render when the page loads
renderHabits();

// Event listener for adding a new habit when the user presses Enter
habitInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addHabit();
    }
});
