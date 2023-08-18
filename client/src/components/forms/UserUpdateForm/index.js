import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import { UserUpdateFormPropTypes } from '../../../propTypes';
import AvatarCropper from '../../AvatarCropper';
import UserFormInput from '../UserFormInput';
import Schems from '../../../utils/validateSchemas';
import * as ActionsUser from '../../../actions/userCreators';
import * as ActionsCreators from '../../../actions/creators';
import styles from './UserUpdateForm.module.scss';
import UserFormButton from '../UserFormButton';
const { LoginUpdateSchem, EmailUpdateSchem, PasswordUpdateSchem } = Schems;

const UserUpdateForm = props => {
  const { id, name, value, type, editProfile } = props;
  const { error } = useSelector(({ users }) => users);
  const { updateUserRequest } = bindActionCreators(ActionsUser, useDispatch());
  const { cleanUserError } = bindActionCreators(ActionsCreators, useDispatch());
  const [initialFormValues, setInitialFormValues] = useState({
    [name]: !value ? '' : value,
  });
  const [prevValues, setPrevValues] = useState(null);
  const validationSchema = useMemo(
    () =>
      name === 'login'
        ? LoginUpdateSchem
        : name === 'email'
        ? EmailUpdateSchem
        : name === 'password'
        ? PasswordUpdateSchem
        : null,
    [name]
  );
  useEffect(() => {
    return () => {
      cleanUserError();
    };
  }, []);
  useEffect(() => {
    if (error?.status === 409) {
      setInitialFormValues(prevValues);
    }
  }, [error]);
  const onSubmit = values => {
    updateUserRequest(id, values);
    setPrevValues(initialFormValues);
    setInitialFormValues(values);
  };
  return (
    <div className={styles.container} onClick={editProfile}>
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form
          className={classNames({
            [styles.form]: type !== 'file',
            [styles.cropper]: type === 'file',
          })}
          onClick={e => e.stopPropagation()}
        >
          {type === 'file' ? (
            <AvatarCropper editProfile={editProfile} fieldName={name} />
          ) : (
            <>
              <UserFormInput name={name} type={type} />
              <div className={styles.button_wrapper}>
                <UserFormButton
                  fieldName={name}
                  type='submit'
                  style={{ order: 1 }}
                  isValidatable
                >
                  Save
                </UserFormButton>
                <UserFormButton
                  fieldName={name}
                  onClick={e => {
                    e.preventDefault();
                    editProfile();
                  }}
                >
                  Cancel
                </UserFormButton>
              </div>
            </>
          )}
        </Form>
      </Formik>
    </div>
  );
};

UserUpdateForm.propTypes = UserUpdateFormPropTypes;

export default UserUpdateForm;
