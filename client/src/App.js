import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Routes, Route } from 'react-router-dom';
import Spinner from './components/Spinner';
import PageNotFound from './pages/PageNotFound';
import OnlyForLoginedUser from './pages/OnlyForLoginedUser';
import CONSTANTS from './constants';
import * as ActionUser from './actions/userCreators';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const UserTasksPage = lazy(() => import('./pages/UserTasksPage'));
const UserTaskPage = lazy(() => import('./pages/UserTaskPage'));
const ChatsPage = lazy(() => import('./pages/ChatsPage'));

const App = () => {
  const { user } = useSelector(({ users }) => users);
  const { getAuthUserRequest, setOnlineStatusRequest } = bindActionCreators(
    ActionUser,
    useDispatch()
  );
  useEffect(() => {
    getAuthUserRequest();
  }, []);
  useEffect(() => {
    if (user) {
      setOnlineStatusRequest({ userId: user.id, status: 'online' });
    }
  }, [user]);
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            exact
            path='/sign-in'
            element={<AuthPage formType={CONSTANTS.SIGN_IN} />}
          />
          <Route
            exact
            path='/sign-up'
            element={<AuthPage formType={CONSTANTS.SIGN_UP} />}
          />
          <Route exact path='/' element={<HomePage />} />
          {user ? (
            <>
              <Route exact path='/profile' element={<UserPage />} />
              <Route exact path='/profile/tasks' element={<UserTasksPage />} />
              <Route
                exact
                path='/profile/tasks/:taskId'
                element={<UserTaskPage />}
              />
              <Route exact path='/chats' element={<ChatsPage />} />
            </>
          ) : (
            <>
              <Route path='/profile/*' element={<OnlyForLoginedUser />} />
              <Route path='/chats/*' element={<OnlyForLoginedUser />} />
            </>
          )}
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
