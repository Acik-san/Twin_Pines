import React from 'react';
import { useDataForAuthForm } from '../../../hooks';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Schems from '../../../utils/validateSchemas';
import styles from './AuthForm.module.scss';
import CONSTANTS from '../../../constants';
import { Link } from 'react-router-dom';

const AuthForm = props => {
  const { formType } = props;
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
            <label key={id} className={styles.label}>
              <Field type={type} name={name} placeholder={placeholder} />
              <ErrorMessage
                name={name}
                component='span'
                className={styles.error}
              />
            </label>
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
