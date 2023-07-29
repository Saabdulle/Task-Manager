// import React, { useState } from "react";

// export default function TaskForm({ addTask }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [createdAt, setCreatedAt] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const task = {
//       id: Date.now(),
//       title,
//       description,
//       createdAt,
//     };
//     addTask(task);
//     setTitle("");
//     setDescription("");
//     setCreatedAt("");
//   };

//   return (
//     <div>
//       <h2>Create Task</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Created At:
//           <input
//             type="text"
//             value={createdAt}
//             onChange={(e) => setCreatedAt(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Add Task</button>
//       </form>
//     </div>
//   );
// }
// frontend/components/TaskForm.jsx

// import React, { useState } from "react";

// export default function TaskForm({ addTask }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [createdAt, setCreatedAt] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const task = {
//       title,
//       description,
//       createdAt: Date.now(),
//     };
//     addTask(task);
//     setTitle("");
//     setDescription("");
//     setCreatedAt("");
//   };

//   return (
//     <div>
//       <h2>Create Task</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Add Task</button>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";

// export default function TaskForm({ addTask }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const task = {
//       title,
//       description,
//       createdAt: new Date().toISOString().slice(0, 10), // Format date to "YYYY-MM-DD"
//     };

//     try {
//       const response = await fetch("http://localhost:3000/tasks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(task),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create task");
//       }

//       const data = await response.json();
//       addTask(data); // Update the state with the new task received from the server
//       setTitle("");
//       setDescription("");
//     } catch (error) {
//       console.error("Error creating task:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Task</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Add Task</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";

export default function TaskForm({ addTask, editTask }) {
  const [title, setTitle] = useState(editTask ? editTask.title : "");
  const [description, setDescription] = useState(
    editTask ? editTask.description : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
    };

    try {
      let response;
      if (editTask) {
        // If editTask is defined, we are editing an existing task
        response = await fetch(`http://localhost:3000/tasks/${editTask._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });
      } else {
        // If editTask is not defined, we are creating a new task
        response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to create or edit task");
      }

      const data = await response.json();
      addTask(data); // Update the state with the new/edited task received from the server
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating or editing task:", error);
    }
  };

  return (
    <div>
      <h2>{editTask ? "Edit Task" : "Create Task"}</h2>
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
        <button type="submit">{editTask ? "Save Changes" : "Add Task"}</button>
      </form>
    </div>
  );
}
