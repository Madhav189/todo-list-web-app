require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * TEST ROUTE
 * Used to check if backend is running
 */
app.get("/", (req, res) => {
    res.send("Backend is running successfully 🚀");
});

/**
 * GET all tasks
 */
app.get("/tasks", (req, res) => {
    const sql = "SELECT * FROM tasks";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.json(result);
    });
});

/**
 * ADD new task
 */
app.post("/tasks", (req, res) => {
    const { title, priority, due_date } = req.body;

    const sql =
        "INSERT INTO tasks (user_id, title, priority, due_date) VALUES (1, ?, ?, ?)";

    db.query(sql, [title, priority, due_date], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Insert failed");
        }
        res.send("Task added successfully");
    });
});
/**
 * UPDATE task by ID
 */
app.put("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const { title, priority, due_date, status } = req.body;

    const sql = `
        UPDATE tasks
        SET title = ?, priority = ?, due_date = ?, status = ?
        WHERE id = ?
    `;

    db.query(sql, [title, priority, due_date, status, taskId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Update failed");
        }
        res.send("Task updated successfully");
    });
});

/**
 * DELETE task by ID
 */
app.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id;

    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [taskId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Delete failed");
        }
        res.send("Task deleted successfully");
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
