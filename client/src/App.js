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
        alert("Task is added!")
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  return (
    <div>
      <h1>Project Task Tracker</h1>
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
          <li key={task.idtasks}>
            {task.task_name}
             {/* - Created at: {task.created_at} - Updated at:{" "}
            {task.updated_at} */}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default App;
