import React, { FC } from 'react';
import { IConfirmButton } from '../../types';
import styles from './ConfirmButton.module.scss';

const ConfirmButton: FC<IConfirmButton> = ({ buttonText, handleClick }) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default ConfirmButton;
