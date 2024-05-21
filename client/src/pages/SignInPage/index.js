import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';
import CONSTANTS from '../../constants';
import * as ActionsCreators from '../../actions/creators';
import 'react-toastify/dist/ReactToastify.css';
import styles from './SignInPage.module.scss';

const SignInPage = () => {
  const { user, error } = useSelector(({ users }) => users);
  const { cleanUserError } = bindActionCreators(ActionsCreators, useDispatch());
  const navigate = useNavigate();
  const redirectPath = localStorage.getItem('redirectPath');
  useEffect(() => {
    return () => {
      cleanUserError();
    };
  }, []);
  useEffect(() => {
    if (error?.status === 401) {
      toast.error(error.message);
    }
  }, [error]);
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
    if (user && redirectPath) {
      navigate(redirectPath, { replace: true });
      localStorage.removeItem('redirectPath');
    }
  }, [user, redirectPath]);
  return (
    <>
      <section className={styles.container}>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        <AuthForm formType={CONSTANTS.SIGN_IN} />
      </section>
    </>
  );
};

export default SignInPage;
