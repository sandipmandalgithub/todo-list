const todoList = document.getElementById("todoList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

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
        errorMessage.style.display = "block";
    }
}

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

            <span class="todo-status">
                ${todo.completed ? "Completed" : "Pending"}
            </span>
        `;

        todoList.appendChild(todoCard);
    });
}

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

loadTodos();