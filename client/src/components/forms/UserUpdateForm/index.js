import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import { UserUpdateFormPropTypes } from '../../../propTypes';
import { useClickOutside } from '../../../hooks';
import AvatarCropper from '../../AvatarCropper';
import UserFormInput from '../UserFormInput';
import Schems from '../../../utils/validateSchemas';
import * as ActionsUser from '../../../actions/userCreators';
import * as ActionsCreators from '../../../actions/creators';
import styles from './UserUpdateForm.module.scss';
import UserFormButton from '../UserFormButton';
const {
  UsernameUpdateSchem,
  NameUpdateSchem,
  EmailUpdateSchem,
  PasswordUpdateSchem,
} = Schems;

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
      name === 'userName'
        ? UsernameUpdateSchem
        : name === 'name'
        ? NameUpdateSchem
        : name === 'email'
        ? EmailUpdateSchem
        : name === 'password'
        ? PasswordUpdateSchem
        : null,
    [name]
  );
  const containerRef = useRef(null);
  useClickOutside(containerRef, editProfile);

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
    <div className={styles.container} /*onMouseDown={editProfile}*/>
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
          // onMouseDown={e => e.stopPropagation()}
          ref={containerRef}
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
