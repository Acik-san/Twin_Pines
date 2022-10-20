import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import PageNotFound from "./pages/PageNotFound";

const HomePage = lazy(() => import("./pages/HomePage"));
const TasksPage = lazy(() => import("./pages/TasksPage"));
const UserCreatePage = lazy(() => import("./pages/UserCreatePage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const UserTasksPage = lazy(() => import("./pages/UserTasksPage"));
const UserTaskPage = lazy(() => import("./pages/UserTaskPage"));

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/create-user" element={<UserCreatePage />} />
          <Route path="/users/:userId" element={<UserPage />} />
          <Route path="/users/:userId/tasks" element={<UserTasksPage />} />
          <Route
            path="/users/:userId/tasks/:taskId"
            element={<UserTaskPage />}
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
