import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Routes, Route } from 'react-router-dom';
import Spinner from './components/Spinner';
import PageNotFound from './pages/PageNotFound';
import OnlyForLoginedUser from './pages/OnlyForLoginedUser';
import * as ActionUser from './actions/userCreators';

const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const UserPage = lazy(() => import('./pages/UserPage'));
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
          <Route exact path='/sign-in' element={<SignInPage />} />
          <Route exact path='/sign-up' element={<SignUpPage />} />
          <Route exact path='/' element={<HomePage />} />
          {user ? (
            <>
              <Route exact path='/profile' element={<UserPage />} />
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
