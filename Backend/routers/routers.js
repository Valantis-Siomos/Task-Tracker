const express = require("express");
const router = express.Router();
const taskController = require("../controllers/controllers");

// Get all tasks
router.get("/", taskController.getAllTasks);

// Add a new task
router.post("/", taskController.addTask);

// Update a task
router.put("/:idtasks", taskController.updateTask);

// Delete a task
router.delete("/:idtasks", taskController.deleteTask);

module.exports = router;
