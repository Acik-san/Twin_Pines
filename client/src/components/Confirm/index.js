import { useRef, Children, isValidElement } from 'react';
import { ConfirmPropTypes } from '../../propTypes';
import { useClickOutside } from '../../hooks';
import ConfirmButton from '../ConfirmButton';
import styles from './Confirm.module.scss';

const Confirm = props => {
  const { messageText, handleClick, children } = props;
  const ref = useRef(null);
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

Confirm.propTypes = ConfirmPropTypes;

export default Confirm;
