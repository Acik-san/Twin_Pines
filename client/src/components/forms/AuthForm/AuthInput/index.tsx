import React, { FC } from 'react';
import { ErrorMessage, useField } from 'formik';
import classNames from 'classnames';
import { IAuthInput } from '../../../../types';
import styles from './AuthInput.module.scss';

const AuthInput: FC<IAuthInput> = ({ name, placeholder, type }) => {
  const [field, meta] = useField(name);
  return (
    <label className={styles.label}>
      <input
        type={type}
        placeholder={placeholder}
        className={classNames(styles.input, {
          [styles.invalid]: meta.touched && meta.error,
        })}
        {...field}
      />
      <ErrorMessage name={name} component='span' className={styles.error} />
    </label>
  );
};

export default AuthInput;
