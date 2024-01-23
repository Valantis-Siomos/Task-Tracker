import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ task_name: "" });

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = () => {
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, { id: response.data.id, ...newTask }]);
        setNewTask({ task_name: "" });
        alert("Task is added!");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const updateTask = (taskId, updatedTask) => {
    axios
      .put(`http://localhost:5000/tasks/${taskId}`, updatedTask)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
          )
        );
        alert("Task updated!");
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        alert("Task deleted!");
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Task name"
          value={newTask.task_name}
          onChange={(e) =>
            setNewTask({ ...newTask, task_name: e.target.value })
          }
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task_name}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button
              onClick={() => {
                const updatedTaskName = prompt("Enter updated task name:");
                if (updatedTaskName !== null) {
                  updateTask(task.id, { task_name: updatedTaskName });
                }
              }}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
