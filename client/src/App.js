import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Routes, Route } from 'react-router-dom';
import Spinner from './components/Spinner';
import PageNotFound from './pages/PageNotFound';
import * as ActionUser from './actions/userCreators';

const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const UserCreatePage = lazy(() => import('./pages/UserCreatePage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const UserTasksPage = lazy(() => import('./pages/UserTasksPage'));
const UserTaskPage = lazy(() => import('./pages/UserTaskPage'));

const App = () => {
  const { getAuthUserRequest } = bindActionCreators(ActionUser, useDispatch());
  useEffect(() => {
    getAuthUserRequest();
  }, []);
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route exact path='/sign-in' element={<SignInPage />} />
          <Route exact path='/sign-up' element={<SignUpPage />} />
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/profile' element={<UserPage />} />
          <Route exact path='/profile/tasks' element={<UserTasksPage />} />
          <Route exact path='/profile/tasks/:taskId' element={<UserTaskPage />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
