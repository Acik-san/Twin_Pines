import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FixedBackground from '../../components/FixedBackground';
import styles from './OnlyForLoginedUser.module.scss';

const OnlyForLoginedUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('redirectPath', location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    const id = setTimeout(() => navigate('/sign-in', { replace: true }), 3000);
    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <>
      <FixedBackground />
      <div className={styles.container}>
        <h1>To use this page you must be logined</h1>
        <p>Now you'll be redirect to sign in</p>
      </div>
    </>
  );
};

export default OnlyForLoginedUser;
