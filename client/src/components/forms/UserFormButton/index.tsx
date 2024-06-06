import React, { FC } from 'react';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { IUserFormButton } from '../../../types';
import styles from './UserFormButton.module.scss';

const UserFormButton: FC<IUserFormButton> = ({
  fieldName,
  type,
  style,
  onClick,
  isValidatable,
  children,
}) => {
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

export default UserFormButton;
