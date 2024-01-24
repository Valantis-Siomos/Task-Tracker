import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ task_name: "" });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedTaskName, setUpdatedTaskName] = useState("");
  const [taskIdToUpdate, setTaskIdToUpdate] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  //Add task

  const addTask = () => {
    // Check if the task name is not empty.

    if (!newTask.task_name.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, { id: response.data.id, ...newTask }]);
        setNewTask({ task_name: "" });
        alert("Task is added!");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // Update Task

  const updateTask = () => {
    if (!updatedTaskName.trim()) {
      alert("Updated task name cannot be empty!");
      return;
    }
    axios
      .put(`http://localhost:5000/tasks/${taskIdToUpdate}`, {
        task_name: updatedTaskName,
      })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskIdToUpdate
              ? { ...task, task_name: updatedTaskName }
              : task
          )
        );
        setShowUpdateForm(false);
        alert("Task updated!");
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  //Delete Task

  const deleteTask = (taskId) => {
    const alertDeleteProduct = window.confirm("Are you sure?");
    if (alertDeleteProduct) {
      axios
        .delete(`http://localhost:5000/tasks/${taskId}`)
        .then(() => {
          setTasks(tasks.filter((task) => task.id !== taskId));
          alert("Task deleted!");
        })
        .catch((error) => console.error("Error deleting task:", error));
    } else {
      alert("Something goes wrong with this task");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h1 className="title">Task Tracker</h1>
      <div className="input">
        <input className="inputPlaceholder"
          type="text"
          placeholder="Add your task here"
          value={newTask.task_name}
          onChange={(e) =>
            setNewTask({ ...newTask, task_name: e.target.value })
          }
        />
        <button className="addButton" onClick={addTask}>ADD</button>
      </div>
      <div className="tasks">
        {tasks.map((task) => (
          <div className="task"
            key={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            {task.task_name}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button
              onClick={() => {
                setTaskIdToUpdate(task.id);
                setShowUpdateForm(true);
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>

      {showUpdateForm && (
        <div className="upDateTaskPopUp">
          <input
            type="text"
            placeholder="Updated your task"
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
          />
          <button onClick={updateTask}>Update Task</button>
        </div>
      )}
    </div>
  );
};

export default App;
