import React, { useState, useEffect } from "react";
import { TaskCard, TaskForm } from "../../components";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setIsLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]); // Add the new task to the state
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      // Make the DELETE request to the backend here
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // If the deletion was successful, remove the deleted task from the state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <h1>Tasks Page</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} handleDelete={handleDelete} />
        ))
      )}
    </>
  );
}
