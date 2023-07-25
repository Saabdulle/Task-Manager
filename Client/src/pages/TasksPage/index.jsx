import React, { useState } from "react";
import { TaskForm } from "../../components";
import { TaskList } from "../../components";

function TasksPage() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <div>
      <h1>Tasks Page</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} addTask={addTask} />
    </div>
  );
}

export default TasksPage;
