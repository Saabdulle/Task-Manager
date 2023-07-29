import React from "react";

function TaskCard({ task, handleDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    } else {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  return (
    <div>
      {task ? (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{formatDate(task.createdAt)}</p>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TaskCard;
