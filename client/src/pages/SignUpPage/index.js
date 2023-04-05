import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Header from '../../components/Header';
import * as ActionsAuth from '../../actions/authCreators';

const SignUpPage = () => {
  const { user } = useSelector(({ auth }) => auth);
  const { signUpRequest } = bindActionCreators(ActionsAuth, useDispatch());
  const navigate = useNavigate();
  return (
    <>
      {user && navigate('/', { replace: true })}
      <Header />
      <div style={{ position: 'relative', top: '100px' }}>
        <Formik
          initialValues={{
            login: '',
            email: '',
            password: '',
          }}
          onSubmit={values => signUpRequest(values)}
        >
          <Form>
            <Field name='login' placeholder='login' />
            <Field name='email' placeholder='email' />
            <Field name='password' placeholder='password' />
            <button>Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default SignUpPage;
