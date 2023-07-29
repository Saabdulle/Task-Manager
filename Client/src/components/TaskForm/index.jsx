import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        formData
      );
      const newTask = response.data;
      setTasks([...tasks, newTask]);
      setFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>

      <h2>Existing Tasks:</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;
