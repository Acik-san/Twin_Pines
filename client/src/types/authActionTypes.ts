import { FormValues, IError, IUserData } from '.';
import ACTION_TYPES from '../actions/type';

export interface SignInRequestAction {
  type: typeof ACTION_TYPES.SIGN_IN_REQUEST;
  payload: { values: { email: string; password: string } };
}
export interface SignInSuccessAction {
  type: typeof ACTION_TYPES.SIGN_IN_SUCCESS;
  payload: { user: IUserData };
}
export interface SignInErrorAction {
  type: typeof ACTION_TYPES.SIGN_IN_ERROR;
  payload: { error: IError };
}

export interface SignUpRequestAction {
  type: typeof ACTION_TYPES.SIGN_UP_REQUEST;
  payload: {
    values: FormValues;
  };
}
export interface SignUpSuccessAction {
  type: typeof ACTION_TYPES.SIGN_UP_SUCCESS;
  payload: { user: IUserData };
}
export interface SignUpErrorAction {
  type: typeof ACTION_TYPES.SIGN_UP_ERROR;
  payload: { error: IError };
}

export interface RefreshRequestAction {
  type: typeof ACTION_TYPES.REFRESH_REQUEST;
  payload: { refreshToken: string };
}
export interface RefreshSuccessAction {
  type: typeof ACTION_TYPES.REFRESH_SUCCESS;
  payload: { user: IUserData; tokenPair: { access: string; refresh: string } };
}
export interface RefreshErrorAction {
  type: typeof ACTION_TYPES.REFRESH_ERROR;
  payload: {
    error: IError;
  };
}
export interface LogoutSuccessAction {
  type: typeof ACTION_TYPES.LOGOUT_SUCCESS;
  payload: {};
}
export interface LogoutErrorAction {
  type: typeof ACTION_TYPES.LOGOUT_ERROR;
  payload: {
    error: IError;
  };
}
