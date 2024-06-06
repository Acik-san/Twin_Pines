import React, { useRef, Children, isValidElement, FC } from 'react';
import { IConfirm } from '../../types';
import { useClickOutside } from '../../hooks';
import ConfirmButton from '../ConfirmButton';
import styles from './Confirm.module.scss';

const Confirm: FC<IConfirm> = ({ messageText, handleClick, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, handleClick);
  const validChildren = Children.map(children, child =>
    isValidElement(child) && child.type === ConfirmButton ? child : null
  );
  return (
    <div className={styles.over}>
      <div className={styles.wrapper} ref={ref}>
        <p className={styles.text}>{messageText}</p>
        <div className={styles.button_wrapper}>{validChildren}</div>
      </div>
    </div>
  );
};

export default Confirm;
