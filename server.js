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

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            tls: true
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