import React from 'react';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import styles from './UserFormButton.module.scss';

const UserFormButton = props => {
  const { fieldName, type, style, onClick, isValidatable, children } =
    props;
  const { dirty, isValid } = useFormikContext();
  const [field, meta] = useField(fieldName);
  return (
    <button
      disabled={isValidatable ? !dirty : false}
      className={classNames(styles.button, {
        [styles.button_invalid]: isValidatable && meta.touched && meta.error,
        [styles.button_valid]: isValidatable && dirty && isValid,
      })}
      style={style}
      type={type ? type : null}
      onClick={onClick}
    >
      {children instanceof Function ? children() : children}
    </button>
  );
};

export default UserFormButton;
