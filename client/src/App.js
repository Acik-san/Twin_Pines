import { Routes, Route, NavLink } from "react-router-dom";
import UserForm from "./components/forms/UserForm";
import Task from "./components/Task";
import UserTasks from "./components/UserTasks";
import UserProfile from "./components/UserProfile";
import UsersList from "./components/UsersList";
import TasksList from "./components/TasksList";

const App = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/tasks">Tasks</NavLink>
        </li>
        <li>
          <NavLink to="/create-user">Create user</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/tasks" element={<TasksList />} />
        <Route path="/create-user" element={<UserForm />} />
        <Route path="/users/:userId/" element={<UserProfile />} />
        <Route path="/users/:userId/tasks" element={<UserTasks />} />
        <Route path="/users/:userId/tasks/:taskId" element={<Task />} />
      </Routes>
    </>
  );
};

export default App;
