import React, { FC } from 'react';
import classnames from 'classnames';
import { IButton } from '../../types';
import styles from './Button.module.scss';

const Button: FC<IButton> = ({ buttonName, onClick, className, sx }) => {
  return (
    <>
      <button
        className={classnames(className, styles.button)}
        onClick={onClick}
        style={sx}
      >
        {buttonName}
      </button>
    </>
  );
};

export default Button;
