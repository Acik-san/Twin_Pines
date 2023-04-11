import ACTION_TYPES from './type';

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
//-----------------------------------------------------------
//-----------------------------------------------------------
export const updateUserRequest = (id, values) => ({
  type: ACTION_TYPES.UPDATE_USER_REQUEST,
  payload: { id, values },
});
export const updateUserSuccess = user => ({
  type: ACTION_TYPES.UPDATE_USER_SUCCESS,
  payload: { user },
});
export const updateUserError = error => ({
  type: ACTION_TYPES.UPDATE_USER_ERROR,
  payload: { error },
});

