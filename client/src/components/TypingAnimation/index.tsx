import React, { useState, useEffect, FC } from 'react';
import { ITypingAnimation } from '../../types';
import styles from './TypingAnimation.module.scss';

const TypingAnimation: FC<ITypingAnimation> = ({ classes }) => {
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
