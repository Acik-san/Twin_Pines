import React, { FC } from 'react';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { IUserFormInput } from '../../../types';
import styles from './UserFormInput.module.scss';

const UserFormInput: FC<IUserFormInput> = ({ name, type }) => {
  const { dirty, isValid } = useFormikContext();
  const [field, meta] = useField(name);
  return (
    <>
      <label
        className={classNames(styles.input_wrapper, {
          [styles.input_wrapper_invalid]: meta.touched && meta.error,
          [styles.input_wrapper_valid]: dirty && isValid,
        })}
      >
        <p>{name}</p>
        <input
          type={type}
          placeholder={name}
          className={classNames(styles.input, {
            [styles.input_invalid]: meta.touched && meta.error,
            [styles.input_valid]: !meta.error && dirty,
          })}
          {...field}
        />
        <ErrorMessage name={name} component='span' className={styles.error} />
      </label>
    </>
  );
};

export default UserFormInput;
