const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Todo = require("./models/Todo");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Todo List API is running successfully!"
    });
});

// Create Todo
app.post("/api/todos", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const todo = await Todo.create({
            title,
            description
        });

        res.status(201).json({
            message: "Todo created successfully",
            todo
        });
    } catch (error) {
        console.error("Error creating todo:", error);

        res.status(500).json({
            message: "Failed to create todo"
        });
    }
});

// Get All Todos
app.get("/api/todos", async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: todos.length,
            todos
        });
    } catch (error) {
        console.error("Error fetching todos:", error);

        res.status(500).json({
            message: "Failed to fetch todos"
        });
    }
});

// Search Todos
app.get("/api/todos/search", async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword || !keyword.trim()) {
            return res.status(400).json({
                message: "Keyword is required"
            });
        }

        const searchKeyword = keyword.trim();

        const todos = await Todo.find({
            $or: [
                {
                    title: {
                        $regex: searchKeyword,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: searchKeyword,
                        $options: "i"
                    }
                }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({
            count: todos.length,
            todos
        });
    } catch (error) {
        console.error("Error searching todos:", error);

        res.status(500).json({
            message: "Failed to search todos"
        });
    }
});

// Get Todo by ID
app.get("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json({
            todo
        });
    } catch (error) {
        console.error("Error fetching todo:", error);

        res.status(500).json({
            message: "Failed to fetch todo"
        });
    }
});

// Update Todo
app.put("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const todo = await Todo.findByIdAndUpdate(
            id,
            {
                title,
                description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json({
            message: "Todo updated successfully",
            todo
        });
    } catch (error) {
        console.error("Error updating todo:", error);

        res.status(500).json({
            message: "Failed to update todo"
        });
    }
});

// Complete / Uncomplete Todo
app.patch("/api/todos/:id/complete", async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        todo.completed = !todo.completed;

        await todo.save();

        res.status(200).json({
            message: todo.completed
                ? "Todo marked as completed"
                : "Todo marked as incomplete",
            todo
        });
    } catch (error) {
        console.error("Error updating todo completion:", error);

        res.status(500).json({
            message: "Failed to update todo completion"
        });
    }
});

// Delete Todo
app.delete("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json({
            message: "Todo deleted successfully",
            todo
        });
    } catch (error) {
        console.error("Error deleting todo:", error);

        res.status(500).json({
            message: "Failed to delete todo"
        });
    }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
    }
}

startServer();
