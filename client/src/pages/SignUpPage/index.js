import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import AuthForm from '../../components/forms/AuthForm';
import CONSTANTS from '../../constants';
import * as ActionsCreators from '../../actions/creators'
import 'react-toastify/dist/ReactToastify.css';
import styles from './SignUpPage.module.scss';

const SignUpPage  = () => {
  const { user,error } = useSelector(({ users }) => users);
  const { cleanUserError } = bindActionCreators(ActionsCreators, useDispatch());
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      cleanUserError();
    };
  }, []);
  useEffect(() => {
    if (error?.status === 409) {
      toast.error(error.message);
    }
  }, [error]);
  useEffect(() => {
    user && navigate('/', { replace: true });
  }, [user]);
  return (
    <>
      {/* <Header /> */}
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
        <AuthForm formType={CONSTANTS.SIGN_UP} />
      </section>
    </>
  );
};

export default SignUpPage ;
