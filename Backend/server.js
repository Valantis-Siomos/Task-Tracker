const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mysql = require("mysql2");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.err("Error to connect in Database", err);
  } else {
    console.log("MySQL database connected :)");
  }
});

// function to promisify the database query
const queryAsync = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const results = await queryAsync(
      "SELECT idtasks, task_name, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at, DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at FROM tasks"
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new task
app.post("/tasks", async (req, res) => {
  const { task_name, created_at } = req.body;

  // Check if the task name is not empty
  if (!task_name || task_name.trim() === "") {
    return res.status(400).json({ error: "Task cannot be empty." });
  }

  try {
    const result = await queryAsync(
      "INSERT INTO tasks (task_name, created_at) VALUES (?, ?)",
      [task_name, created_at]
    );

    console.log("Task added successfully:", result);
    res.json({ id: result.insertId });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update a task
app.put("/tasks/:idtasks", async (req, res) => {
  const taskId = req.params.idtasks;
  const { task_name, updated_at } = req.body;

  try {
    await queryAsync(
      "UPDATE tasks SET task_name = ?, updated_at = ? WHERE idtasks = ?",
      [task_name, updated_at, taskId]
    );
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
app.delete("/tasks/:idtasks", async (req, res) => {
  const taskId = req.params.idtasks;

  try {
    await queryAsync("DELETE FROM tasks WHERE idtasks = ?", taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
