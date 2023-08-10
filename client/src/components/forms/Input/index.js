import React from 'react';
import { ErrorMessage, useField } from 'formik';
import classNames from 'classnames';
import styles from './InputInLabel.module.scss';

const Input = props => {
  const { name, className, ...restProps } = props;
  const [field, meta] = useField(name);
  return (
    <label className={styles.label}>
      <input
        {...field}
        className={classNames(className, {
          [styles.invalid]: meta.error && meta.touched,
        })}
        {...restProps}
      />
      <ErrorMessage name={name} component='span' className={styles.error} />
    </label>
  );
};

export default Input;
