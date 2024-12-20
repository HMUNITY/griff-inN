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

        // Habit item HTML structure with extra punctuation fields
        li.innerHTML = `
            <input type="checkbox" class="habit-checkbox" ${habit.completed ? 'checked' : ''} onclick="toggleCompleted(${index})">
            <span class="habit-name">${habit.name}</span>
            <span class="habit-date">(${habit.date})</span>

            <!-- Extra punctuation/comments section -->
            <div class="habit-comments-container">
                <textarea class="habit-comments" placeholder="Add a note..." onchange="updateComments(${index}, this.value)">${habit.comments.join('\n') || ''}</textarea>
                <button onclick="addComment(${index})">Add Another Comment</button>
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
    habitList[index].comments = newComments.split('\n');
    renderHabits();
}

// Add a new comment to a habit
function addComment(index) {
    const comment = prompt('Enter your extra comment:');
    if (comment) {
        habitList[index].comments.push(comment);
        renderHabits();
    }
}

// Add a new habit to the list
function addHabit() {
    const habitName = habitInput.value.trim();
    if (habitName === '') return;

    const currentDate = new Date().toLocaleDateString();

    // Create a new habit object with an empty comment field and the current date
    const newHabit = {
        name: habitName,
        completed: false,
        comments: [],
        date: currentDate
    };

    // Add the new habit to the habit list
    habitList.push(newHabit);

    // Clear the input field and re-render the list
    habitInput.value = '';
    renderHabits();

