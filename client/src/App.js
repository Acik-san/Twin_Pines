import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Routes, Route } from 'react-router-dom';
import Spinner from './components/Spinner';
import PageNotFound from './pages/PageNotFound';
import * as ActionAuth from './actions/authCreators';

const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const TasksPage = lazy(() => import('./pages/TasksPage'));
const UserCreatePage = lazy(() => import('./pages/UserCreatePage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const UserTasksPage = lazy(() => import('./pages/UserTasksPage'));
const UserTaskPage = lazy(() => import('./pages/UserTaskPage'));

const App = () => {
  const { user } = useSelector(({ auth }) => auth);
  const { getAuthUserRequest } = bindActionCreators(ActionAuth, useDispatch());
  useEffect(() => {
    getAuthUserRequest();
  }, []);
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/tasks' element={<TasksPage />} />
          {/* <Route path="/create-user" element={<UserCreatePage />} /> */}
          <Route path='/profile' element={<UserPage />} />
          <Route path='/users/:userId/tasks' element={<UserTasksPage />} />
          <Route
            path='/users/:userId/tasks/:taskId'
            element={<UserTaskPage />}
          />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
