import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import CONSTANTS from '../constants';
import * as ActionsAuth from '../actions/authCreators';
import { FormValues } from '../types';

const useDataForAuthForm = (formType: string) => {
  const initialValues =
    formType === CONSTANTS.SIGN_IN
      ? {
          email: '',
          password: '',
        }
      : {
          userName: '',
          email: '',
          password: '',
          confirmPassword: '',
        };
  const inputs =
    formType === CONSTANTS.SIGN_IN
      ? CONSTANTS.SIGN_IN_FORM_FIELDS
      : CONSTANTS.SIGN_UP_FORM_FIELDS;

  const { signInRequest, signUpRequest } = bindActionCreators(
    ActionsAuth,
    useDispatch()
  );

  const handleSubmit = (values: FormValues) => {
    formType === CONSTANTS.SIGN_IN
      ? signInRequest(values)
      : signUpRequest(values);
  };

  return { initialValues, inputs, handleSubmit };
};

export default useDataForAuthForm;
