import React from 'react';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { UserFormButtonPropTypes } from '../../../propTypes';
import styles from './UserFormButton.module.scss';

const UserFormButton = props => {
  const { fieldName, type, style, onClick, isValidatable, children } = props;
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
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

UserFormButton.propTypes = UserFormButtonPropTypes;

export default UserFormButton;
