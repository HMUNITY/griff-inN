// Initialize habits from localStorage, or create an empty array if none exist
let habits = JSON.parse(localStorage.getItem('habits')) || [];
let completedHabits = habits.filter(habit => habit.completed).length; // Track number of completed habits

// Function to add a new habit
function addHabit() {
    const habitInput = document.getElementById("habit-input");
    const habitName = habitInput.value.trim();

    if (habitName) {
        const habit = {
            name: habitName,
            completed: false
        };
        habits.push(habit);
        habitInput.value = ''; // Reset input field after adding habit
        saveHabits(); // Save updated habits to localStorage
        renderHabits(); // Re-render the habit list
    }
}

// Function to render the habit list
function renderHabits() {
    const habitList = document.getElementById("habit-list");
    habitList.innerHTML = ""; // Clear the existing list

    habits.forEach((habit, index) => {
        const li = document.createElement("li");

        // Create checkbox for habit completion status
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.completed;
        checkbox.addEventListener("change", () => toggleCompletion(index));

        // Add habit name
        const habitText = document.createElement("span");
        habitText.textContent = habit.name;

        // Create a remove button for each habit
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeHabit(index));

        // Append the checkbox, habit name, and remove button to the list item
        li.appendChild(checkbox);
        li.appendChild(habitText);
        li.appendChild(removeButton);
        habitList.appendChild(li);
    });

    // Update statistics (e.g., total habits, completed habits)
    updateStats();
}

// Function to toggle the completion of a habit (checkbox)
function toggleCompletion(index) {
    habits[index].completed = !habits[index].completed;
    // Update completed habit count
    if (habits[index].completed) {
        completedHabits++;
    } else {
        completedHabits--;
    }
    saveHabits(); // Save updated habits to localStorage
    renderHabits(); // Re-render the habit list
}

// Function to remove a habit from the list
function removeHabit(index) {
    habits.splice(index, 1); // Remove the habit from the array
    saveHabits(); // Save updated habits to localStorage
    renderHabits(); // Re-render the habit list
}

// Function to save habits to localStorage
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits)); // Save habits array to localStorage
}

// Function to update the statistics display
function updateStats() {
    const totalHabits = habits.length; // Get total number of habits
    document.getElementById("total-habits").textContent = `Total Habits: ${totalHabits}`;
    document.getElementById("completed-habits").textContent = `Completed: ${completedHabits}`;
}

// Initialize the app by rendering the existing habits
renderHabits();
