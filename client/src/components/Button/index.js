import React from 'react';
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

export default Button;
