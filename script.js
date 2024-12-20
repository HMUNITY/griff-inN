function changeText() {
    document.querySelector("p").textContent = "You clicked the button!";
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
    padding: 20px;
}

h1 {
    color: #4CAF50;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.habit-list {
    margin-top: 20px;
}

.add-habit input {
    padding: 10px;
    font-size: 16px;
    margin-right: 10px;
}

.add-habit button {
    padding: 10px 20px;
}

.habit-stats {
    margin-top: 30px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
}

li button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

li button:hover {
    background-color: #d32f2f;
}

let habits = JSON.parse(localStorage.getItem('habits')) || []; // Get habits from localStorage or initialize empty array
let completedHabits = habits.filter(habit => habit.completed).length; // Count completed habits from localStorage

// Function to add a habit to the list
function addHabit() {
    const habitInput = document.getElementById("habit-input");
    const habitName = habitInput.value.trim();

    if (habitName) {
        const habit = {
            name: habitName,
            completed: false
        };
        habits.push(habit);
        habitInput.value = ''; // Reset input field
        saveHabits();
        renderHabits();
    }
}

// Function to render the list of habits on the page
function renderHabits() {
    const habitList = document.getElementById("habit-list");
    habitList.innerHTML = ""; // Clear the list

    habits.forEach((habit, index) => {
        const li = document.createElement("li");

        // Create checkbox for completion
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.completed;
        checkbox.addEventListener("change", () => toggleCompletion(index));

        // Add habit name text
        const habitText = document.createElement("span");
        habitText.textContent = habit.name;

        // Add remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeHabit(index));

        // Append elements to the list item
        li.appendChild(checkbox);
        li.appendChild(habitText);
        li.appendChild(removeButton);
        habitList.appendChild(li);
    });

    // Update statistics
    updateStats();
}

// Function to toggle the completion of a habit
function toggleCompletion(index) {
    habits[index].completed = !habits[index].completed;
    if (habits[index].completed) {
        completedHabits++;
    } else {
        completedHabits--;
    }
    saveHabits();
    renderHabits();
}

// Function to remove a habit from the list
function removeHabit(index) {
    habits.splice(index, 1);
    saveHabits();
    renderHabits();
}

// Function to save habits to localStorage
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Function to update statistics
function updateStats() {
    const totalHabits = habits.length;
    document.getElementById("total-habits").textContent = `Total Habits: ${totalHabits}`;
    document.getElementById("completed-habits").textContent = `Completed: ${completedHabits}`;
}

// Render the habits when the page is loaded
renderHabits();
