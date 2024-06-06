import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import { IUserUpdateForm } from '../../../types';
import { useTypedSelector, useClickOutside } from '../../../hooks';
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

interface FormValues {
  [name: string]: string;
}

const UserUpdateForm: FC<IUserUpdateForm> = ({
  id,
  name,
  value,
  type,
  editProfile,
}) => {
  const { error } = useTypedSelector(({ users }) => users);
  const { updateUserRequest } = bindActionCreators(ActionsUser, useDispatch());
  const { cleanUserError } = bindActionCreators(ActionsCreators, useDispatch());

  const [initialFormValues, setInitialFormValues] = useState<FormValues>({
    [name]: value || '',
  });
  const [prevValues, setPrevValues] = useState<FormValues | null>(null);
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
    if (error?.status === 409 && prevValues) {
      setInitialFormValues(prevValues);
    }
  }, [error]);
  const onSubmit = (values: FormValues) => {
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

export default UserUpdateForm;
