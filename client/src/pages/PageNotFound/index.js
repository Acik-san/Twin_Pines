import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PageNotFound.module.scss';

const PageNotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const id = setTimeout(() => navigate('/', { replace: true }), 3000);
    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <div className={styles.container}>
      <h1 >Page not found: 404</h1>
      <p >Now you'll be redirect to Home</p>
    </div>
  );
};

export default PageNotFound;
