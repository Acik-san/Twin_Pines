import React from 'react';
import { ButtonPropTypes } from '../../propTypes';
import styles from './Button.module.scss';

const Button = props => {
  const { buttonName, onClick, className, sx } = props;
  return (
    <>
      <button className={className} onClick={onClick} style={sx}>
        {buttonName}
      </button>
    </>
  );
};

Button.propTypes = ButtonPropTypes;

export default Button;
