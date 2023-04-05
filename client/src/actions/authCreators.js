import ACTION_TYPES from './type';

export const signInRequest = values => ({
  type: ACTION_TYPES.SIGN_IN_REQUEST,
  payload: { values },
});
export const signInSuccess = user => ({
  type: ACTION_TYPES.SIGN_IN_SUCCESS,
  payload: { user },
});
export const signInError = error => ({
  type: ACTION_TYPES.SIGN_IN_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const signUpRequest = values => ({
  type: ACTION_TYPES.SIGN_UP_REQUEST,
  payload: { values },
});
export const signUpSuccess = user => ({
  type: ACTION_TYPES.SIGN_UP_SUCCESS,
  payload: { user },
});
export const signUpError = error => ({
  type: ACTION_TYPES.SIGN_UP_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const refreshRequest = refreshToken => ({
  type: ACTION_TYPES.REFRESH_REQUEST,
  payload: { refreshToken },
});
export const refreshSuccess = (user, tokenPair) => ({
  type: ACTION_TYPES.REFRESH_SUCCESS,
  payload: { user, tokenPair },
});
export const refreshError = error => ({
  type: ACTION_TYPES.REFRESH_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const logoutRequest = refreshToken => ({
  type: ACTION_TYPES.LOGOUT_REQUEST,
  payload: { refreshToken },
});
export const logoutSuccess = () => ({
  type: ACTION_TYPES.LOGOUT_SUCCESS,
  payload: {},
});
export const logoutError = error => ({
  type: ACTION_TYPES.LOGOUT_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const getAuthUserRequest = () => ({
  type: ACTION_TYPES.GET_AUTH_USER_REQUEST,
  payload: {},
});
export const getAuthUserSuccess = user => ({
  type: ACTION_TYPES.GET_AUTH_USER_SUCCESS,
  payload: { user },
});
export const getAuthUserError = error => ({
  type: ACTION_TYPES.GET_AUTH_USER_ERROR,
  payload: { error },
});
