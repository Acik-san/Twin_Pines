import ACTION_TYPES from "./type";

export const createUserRequest = (values) => ({
  type: ACTION_TYPES.CREATE_USER_REQUEST,
  payload: { values },
});
export const createUserSuccess = (user) => ({
  type: ACTION_TYPES.CREATE_USER_SUCCESS,
  payload: { user },
});
export const createUserError = (error) => ({
  type: ACTION_TYPES.CREATE_USER_REQUEST,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getUsersRequest = ({ limit, offset }) => ({
  type: ACTION_TYPES.GET_USERS_REQUEST,
  payload: { limit, offset },
});
export const getUsersSuccess = (users) => ({
  type: ACTION_TYPES.GET_USERS_SUCCESS,
  payload: { users },
});
export const getUsersError = (error) => ({
  type: ACTION_TYPES.GET_USERS_ERROR,
  payload: { error },
});
