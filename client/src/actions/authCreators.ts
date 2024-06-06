import ACTION_TYPES from './type';
import { FormValues, IError, IUserData } from '../types';
import {
  LogoutErrorAction,
  LogoutSuccessAction,
  RefreshErrorAction,
  RefreshRequestAction,
  RefreshSuccessAction,
  SignInErrorAction,
  SignInRequestAction,
  SignInSuccessAction,
  SignUpErrorAction,
  SignUpRequestAction,
  SignUpSuccessAction,
} from '../types/authActionTypes';

export const signInRequest = (values: {
  email: string;
  password: string;
}): SignInRequestAction => ({
  type: ACTION_TYPES.SIGN_IN_REQUEST,
  payload: { values },
});
export const signInSuccess = (user: IUserData): SignInSuccessAction => ({
  type: ACTION_TYPES.SIGN_IN_SUCCESS,
  payload: { user },
});
export const signInError = (error: IError): SignInErrorAction => ({
  type: ACTION_TYPES.SIGN_IN_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const signUpRequest = (values:FormValues): SignUpRequestAction => ({
  type: ACTION_TYPES.SIGN_UP_REQUEST,
  payload: { values },
});
export const signUpSuccess = (user: IUserData): SignUpSuccessAction => ({
  type: ACTION_TYPES.SIGN_UP_SUCCESS,
  payload: { user },
});
export const signUpError = (error: IError): SignUpErrorAction => ({
  type: ACTION_TYPES.SIGN_UP_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const refreshRequest = (refreshToken: string): RefreshRequestAction => ({
  type: ACTION_TYPES.REFRESH_REQUEST,
  payload: { refreshToken },
});
export const refreshSuccess = (
  user: IUserData,
  tokenPair: { access: string; refresh: string }
): RefreshSuccessAction => ({
  type: ACTION_TYPES.REFRESH_SUCCESS,
  payload: { user, tokenPair },
});
export const refreshError = (error: IError): RefreshErrorAction => ({
  type: ACTION_TYPES.REFRESH_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const logoutSuccess = (): LogoutSuccessAction => ({
  type: ACTION_TYPES.LOGOUT_SUCCESS,
  payload: {},
});
export const logoutError = (error: IError): LogoutErrorAction => ({
  type: ACTION_TYPES.LOGOUT_ERROR,
  payload: { error },
});
