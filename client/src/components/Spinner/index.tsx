import React from 'react';
import FixedBackground from '../FixedBackground';
import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <>
      <FixedBackground />
      <div className={styles.loader}></div>
    </>
  );
};

export default Spinner;
