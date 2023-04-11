import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Formik } from 'formik';
import { SCHEMA_USER } from '../../../utils/validateSchemas';
import * as ActionsUser from '../../../actions/userCreators';
import Input from '../Input';
import styles from './UserUpdateForm.module.scss';

const UserUpdateForm = props => {
  const {editProfile} = props;
  const {
    user: { id, avatar, login },
  } = useSelector(({ users }) => users);
  const { updateUserRequest } = bindActionCreators(ActionsUser, useDispatch());
  const onSubmit = (values, formikBag) => {
    updateUserRequest(id, values);
    formikBag.resetForm();
    editProfile()
  };
  return (
    <Formik
      initialValues={{ login: login, password: '', avatar: avatar }}
      onSubmit={onSubmit}
      validationSchema={SCHEMA_USER}
    >
      {formikProps => (
        <Form className={styles.form}>
          <div className={styles.input_container}>
            <Input name='login' placeholder='Login' className={styles.input} />
            <Input
              name='password'
              placeholder='Password'
              type='password'
              className={styles.input}
            />
          </div>
          <label htmlFor='avatar' className={styles.upload_avatar}>
            <input
              id='avatar'
              name='avatar'
              type='file'
              onChange={e => {
                return formikProps.setFieldValue('avatar', e.target.files[0]);
              }}
              className={styles.input_none}
            />
          </label>
          <label htmlFor='submit' className={styles.save_settings}>
            <input
              id='submit'
              type='submit'
              value='Send'
              className={styles.input_none}
            />
          </label>
        </Form>
      )}
    </Formik>
  );
};

export default UserUpdateForm;
