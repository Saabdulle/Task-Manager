import React, { useState } from "react";
import { TaskCard, TaskForm } from "../../components";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <div>
      <h1>Tasks Page</h1>
      <TaskForm addTask={addTask} />
    </div>
  );
}
