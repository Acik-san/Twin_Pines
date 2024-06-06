import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { IAuthForm } from '../../../types';
import { useDataForAuthForm } from '../../../hooks';
import Schems from '../../../utils/validateSchemas';
import CONSTANTS from '../../../constants';
import styles from './AuthForm.module.scss';
import AuthInput from './AuthInput';

const AuthForm: FC<IAuthForm> = ({ formType }) => {
  const { initialValues, inputs, handleSubmit } = useDataForAuthForm(formType);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={
        formType === CONSTANTS.SIGN_IN ? Schems.SignInSchem : Schems.SignUpSchem
      }
    >
      <div className={styles.formContainer}>
        <Form className={styles.form}>
          {inputs.map(({ id, name, type, placeholder }) => (
            <AuthInput
              key={id}
              name={name}
              type={type}
              placeholder={placeholder}
            />
          ))}
          <button type='submit'>
            {formType === CONSTANTS.SIGN_IN ? 'SIGN-IN' : 'SIGN-UP'}
          </button>
        </Form>
        {formType === CONSTANTS.SIGN_IN ? (
          <div className={styles.pageLink}>
            <span>Haven't account yet ?</span>
            <Link to='/sign-up'>Sign Up</Link>
          </div>
        ) : (
          <div className={styles.pageLink}>
            <span>Already have an account ?</span>
            <Link to='/sign-in'>Sign In</Link>
          </div>
        )}
      </div>
    </Formik>
  );
};

export default AuthForm;
