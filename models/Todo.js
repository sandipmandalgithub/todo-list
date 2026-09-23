const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true,
            default: ""
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;