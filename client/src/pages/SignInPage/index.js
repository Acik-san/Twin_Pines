import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Header from '../../components/Header';
import * as ActionsAuth from '../../actions/authCreators';

const SignInPage = () => {
  const { user } = useSelector(({ auth }) => auth);
  const { signInRequest } = bindActionCreators(ActionsAuth, useDispatch());
  const navigate = useNavigate();
  return (
    <>
      {user && navigate('/', { replace: true })}
      <Header />
      <div style={{ position: 'relative', top: '100px' }}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values => signInRequest(values)}
        >
          <Form>
            <Field name='email' placeholder='email' />
            <Field name='password' placeholder='password' />
            <button>Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default SignInPage;
