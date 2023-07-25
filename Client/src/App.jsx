// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import * as Pages from "./pages";
// const App = () => {
//   // const [tasks, setTasks] = useState([]);

//   // useEffect(() => {
//   //   // Fetch tasks from the server
//   //   fetch("http://localhost:3000/tasks/")
//   //     .then((response) => response.json())
//   //     .then((data) => setTasks(data));
//   // }, []);

//   return (
//     <Routes index element={<Pages.NotFound />}>
//       <Route>
//         <Route path="/" element={<Pages.HomePage />} />
//         <Route path="*" element={<Pages.NotFound />} />
//       </Route>
//     </Routes>
//   );
// };

// export default App;

// // <div>

// //   <h1>Task Manager</h1>
// //   <ul>
// //     {tasks.map((task) => (
// //       <li key={task._id}>
// //         {/* <h4>{task._id}</h4> */}
// //         <h3>{task.title}</h3>
// //         <p>{task.description}</p>
// //         <p>{task.createdAt}</p>
// //       </li>
// //     ))}
// //   </ul>

// // </div>

import React from "react";
import { Routes, Route } from "react-router-dom";
import * as Pages from "./pages";
import { NavBar } from "./components";
function App() {
  return (
    <>
      <h1>My App</h1>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Pages.HomePage />} />
          <Route path="/tasks" element={<Pages.Tasks />} />
          {/* <Route path="/tasks:id" element={Pages.TasksList} /> */}
          <Route path="/create" element={<Pages.TasksPage />} />
          <Route path="/search" element={<Pages.SearchTask />} />
          <Route path="*" element={<Pages.NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
