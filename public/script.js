const todoList = document.getElementById("todoList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

const todoForm = document.getElementById("todoForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const addTodoButton = document.getElementById("addTodoButton");


// Load Todos
async function loadTodos() {
    try {
        loadingMessage.style.display = "block";
        errorMessage.style.display = "none";

        const response = await fetch("/api/todos");

        if (!response.ok) {
            throw new Error("Failed to fetch todos");
        }

        const data = await response.json();

        const todos = data.todos;

        displayTodos(todos);
        updateCounter(todos);

        loadingMessage.style.display = "none";

    } catch (error) {
        console.error("Error loading todos:", error);

        loadingMessage.style.display = "none";
        errorMessage.textContent = "Failed to load todos.";
        errorMessage.style.display = "block";
    }
}


// Display Todos
function displayTodos(todos) {
    todoList.innerHTML = "";

    if (todos.length === 0) {
        todoList.innerHTML = `
            <p>No todos found.</p>
        `;

        return;
    }

    todos.forEach((todo) => {

        const todoCard = document.createElement("div");

        todoCard.className = "todo-card";

        todoCard.innerHTML = `
            <h3>${todo.title}</h3>

            <p>
                ${todo.description || "No description"}
            </p>

            <span class="todo-status ${todo.completed ? "completed" : "pending"}">
                ${todo.completed ? "Completed" : "Pending"}
            </span>

            <div class="todo-actions">

                <button
                    class="complete-button"
                    onclick="toggleTodo('${todo._id}')"
                >
                    ${todo.completed ? "Mark as Pending" : "Mark as Complete"}
                </button>

                <button
                    class="delete-button"
                    onclick="deleteTodo('${todo._id}')"
                >
                    Delete
                </button>

            </div>
        `;

        todoList.appendChild(todoCard);
    });
}


// Update Counter
function updateCounter(todos) {

    const total = todos.length;

    const completed = todos.filter(
        (todo) => todo.completed === true
    ).length;

    const pending = total - completed;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;
}


// Add Todo
todoForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title) {
        errorMessage.textContent = "Title is required.";
        errorMessage.style.display = "block";
        return;
    }

    try {

        addTodoButton.disabled = true;
        addTodoButton.textContent = "Adding...";

        errorMessage.style.display = "none";
        successMessage.style.display = "none";

        const response = await fetch("/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create todo");
        }

        successMessage.textContent = "Todo added successfully!";
        successMessage.style.display = "block";

        todoForm.reset();

        await loadTodos();

    } catch (error) {

        console.error("Error creating todo:", error);

        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";

    } finally {

        addTodoButton.disabled = false;
        addTodoButton.textContent = "Add Todo";
    }
});


// Complete / Uncomplete Todo
async function toggleTodo(id) {

    try {

        errorMessage.style.display = "none";
        successMessage.style.display = "none";

        const response = await fetch(`/api/todos/${id}/complete`, {
            method: "PATCH"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to update todo"
            );
        }

        successMessage.textContent = data.message;
        successMessage.style.display = "block";

        await loadTodos();

    } catch (error) {

        console.error("Error updating todo:", error);

        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";
    }
}


// Delete Todo
async function deleteTodo(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this todo?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        errorMessage.style.display = "none";
        successMessage.style.display = "none";

        const response = await fetch(`/api/todos/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to delete todo"
            );
        }

        successMessage.textContent = "Todo deleted successfully!";
        successMessage.style.display = "block";

        await loadTodos();

    } catch (error) {

        console.error("Error deleting todo:", error);

        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";
    }
}


// Initial Load
loadTodos();
