// Get DOM elements
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");

// Array to store habit items
let habits = [];

// Add habit function
addHabitBtn.addEventListener("click", () => {
    const habitText = habitInput.value.trim();

    if (habitText) {
        const habit = {
            name: habitText,
            completed: false,
            comments: "",
            dateAdded: new Date().toLocaleDateString()
        };
        habits.push(habit);
        habitInput.value = ""; // Clear input
        renderHabits();
    }
});

// Render all habits
function renderHabits() {
    habitList.innerHTML = ""; // Clear existing list
    habits.forEach((habit, index) => {
        const li = document.createElement("li");
        li.classList.add("habit-item");

        li.innerHTML = `
            <div class="habit-details">
                <span class="habit-name">${habit.name}</span>
                <input type="checkbox" class="habit-checkbox" ${habit.completed ? "checked" : ""} data-index="${index}">
            </div>
            <div class="habit-comments-container">
                <textarea class="habit-comments" placeholder="Add your comments here..." data-index="${index}">${habit.comments}</textarea>
            </div>
            <p class="habit-date">Added on: ${habit.dateAdded}</p>
            <button class="remove-habit-btn" data-index="${index}">Remove Habit</button>
        `;

        habitList.appendChild(li);
    });
}

// Handle habit checkbox change
habitList.addEventListener("change", (e) => {
    if (e.target.classList.contains("habit-checkbox")) {
        const index = e.target.getAttribute("data-index");
        habits[index].completed = e.target.checked;
        renderHabits();
    }
});

// Handle comment change
habitList.addEventListener("input", (e) => {
    if (e.target.classList.contains("habit-comments")) {
        const index = e.target.getAttribute("data-index");
        habits[index].comments = e.target.value;
    }
});

// Remove habit function
habitList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-habit-btn")) {
        const index = e.target.getAttribute("data-index");
        habits.splice(index, 1);
        renderHabits();
    }
});
