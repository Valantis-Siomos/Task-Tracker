const { queryAsync } = require("../conection/db");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const results = await queryAsync(
      "SELECT idtasks, task_name, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at, DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at FROM tasks"
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new task
const addTask = async (req, res) => {
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
};

// Update a task
const updateTask = async (req, res) => {
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
};

// Delete a task
const deleteTask = async (req, res) => {
  const taskId = req.params.idtasks;

  try {
    await queryAsync("DELETE FROM tasks WHERE idtasks = ?", taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
};
