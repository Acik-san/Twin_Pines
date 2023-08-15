import React from 'react';
import { ErrorMessage, useField } from 'formik';
import classNames from 'classnames';
import styles from './AuthInput.module.scss';

const AuthInput = props => {
  const { name, type, placeholder } = props;
  const [field, meta] = useField(name);
  return (
    <label className={styles.label}>
      <input
        name={name}
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
