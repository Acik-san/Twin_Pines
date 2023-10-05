import React from 'react';
import { ConfirmButtonPropTypes } from '../../propTypes';
import styles from './ConfirmButton.module.scss';

const ConfirmButton = props => {
  const { buttonText, handleClick } = props;
  return (
    <button className={styles.button} onClick={handleClick}>
      {buttonText}
    </button>
  );
};

ConfirmButton.propTypes = ConfirmButtonPropTypes;

export default ConfirmButton;
