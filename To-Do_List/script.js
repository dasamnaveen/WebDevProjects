var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");

// Retrieve todos from localStorage or initialize as empty array
var todos = JSON.parse(localStorage.getItem("list_todos")) || [];

// Function to render todos
function renderTodos() {
    // Clear existing list content
    listElement.innerHTML = "";

    // Loop through todos array and create list items
    todos.forEach(function(todo, index) {
        var todoElement = document.createElement("li");
        var todoText = document.createTextNode(todo);

        // Create "Done" link
        var linkElement = document.createElement("a");
        linkElement.textContent = "Done";
        linkElement.href = "#";
        linkElement.addEventListener("click", function() {
            deleteTodo(index); // Call deleteTodo function with current index
        });

        // Append todo text and "Done" link to list item
        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);

        // Append list item to the ul element
        listElement.appendChild(todoElement);
    });
}

// Initial rendering of todos
renderTodos();

// Function to add new todo
function addTodo() {
    var todoText = inputElement.value.trim(); // Get input value and trim whitespace

    if (todoText !== "") { // Check if input value is not empty
        todos.push(todoText); // Add new todo to array
        inputElement.value = ""; // Clear input field
        renderTodos(); // Render updated todos
        saveToStorage(); // Save todos to localStorage
    }
}

// Event listener for "Add" button click
buttonElement.addEventListener("click", addTodo);

// Function to delete todo by index
function deleteTodo(index) {
    todos.splice(index, 1); // Remove todo at specified index
    renderTodos(); // Render updated todos
    saveToStorage(); // Save todos to localStorage
}

// Function to save todos to localStorage
function saveToStorage() {
    localStorage.setItem("list_todos", JSON.stringify(todos));
}
