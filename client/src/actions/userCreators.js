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
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getUserRequest = (id) => ({
  type: ACTION_TYPES.GET_USER_REQUEST,
  payload: { id },
});
export const getUserSuccess = (user) => ({
  type: ACTION_TYPES.GET_USER_SUCCESS,
  payload: { user },
});
export const getUserError = (error) => ({
  type: ACTION_TYPES.GET_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const updateUserRequest = (id, values) => ({
  type: ACTION_TYPES.UPDATE_USER_REQUEST,
  payload: { id, values },
});
export const updateUserSuccess = (user) => ({
  type: ACTION_TYPES.UPDATE_USER_SUCCESS,
  payload: { user },
});
export const updateUserError = (error) => ({
  type: ACTION_TYPES.UPDATE_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const deleteUserRequest = (id) => ({
  type: ACTION_TYPES.DELETE_USER_REQUEST,
  payload: { id },
});
export const deleteUserSuccess = (user) => ({
  type: ACTION_TYPES.DELETE_USER_SUCCESS,
  payload: { user },
});
export const deleteUserError = (error) => ({
  type: ACTION_TYPES.DELETE_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const cleanUsers = () => ({
  type: ACTION_TYPES.CLEAN_USERS,
  payload: {},
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getSumUserRequest = () => ({
  type: ACTION_TYPES.GET_SUM_USERS_REQUEST,
  payload: {},
});
export const getSumUserSuccess = (sum) => ({
  type: ACTION_TYPES.GET_SUM_USERS_SUCCESS,
  payload: { sum },
});
export const getSumUserError = (error) => ({
  type: ACTION_TYPES.GET_SUM_USERS_ERROR,
  payload: { error },
});
