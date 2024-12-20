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
