import React, { useState } from "react";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      title,
      description,
      createdAt,
    };
    addTask(task);
    setTitle("");
    setDescription("");
    setCreatedAt("");
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Created At:
          <input
            type="text"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
