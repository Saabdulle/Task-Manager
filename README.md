# Task-Manager

import React, { useState } from "react";

function TaskList({ tasks, addTask }) {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

const handleSubmit = (e) => {
e.preventDefault();
const task = {
id: Date.now(),
title,
description,
};
addTask(task);
setTitle("");
setDescription("");
};

return (
<div>
<h2>Task List</h2>
<ul>
{tasks.map((task) => (
<li key={task.id}>
<strong>{task.title}</strong>
<br />
{task.description}
</li>
))}
</ul>
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
<input
type="text"
value={description}
onChange={(e) => setDescription(e.target.value)}
/>
</label>
<br />
<button type="submit">Add Task</button>
</form>
</div>
);
}

export default TaskList;
