import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './TypingAnimation.module.scss';

const TypingAnimation = props => {
  const { classes } = props;
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length >= 3 ? '' : prevDots + '.'));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className={classes}>Typing{dots}</div>;
};

export default TypingAnimation;
