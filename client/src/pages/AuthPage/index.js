import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AuthForm from '../../components/forms/AuthForm';
import styles from './AuthPage.module.scss';

const AuthPage = props => {
  const { formType } = props;
  const { user } = useSelector(({ users }) => users);
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate('/', { replace: true });
  }, [user]);
  return (
    <>
      {/* <Header /> */}
      <section className={styles.container}>
        <AuthForm formType={formType} />
      </section>
    </>
  );
};

export default AuthPage;
