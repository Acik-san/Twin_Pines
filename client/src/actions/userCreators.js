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
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getUsersRequest = () => ({
  type: ACTION_TYPES.GET_USERS_REQUEST,
  payload: {},
});
export const getUsersSuccess = users => ({
  type: ACTION_TYPES.GET_USERS_SUCCESS,
  payload: { users },
});
export const getUsersError = error => ({
  type: ACTION_TYPES.GET_USERS_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const setOnlineStatusRequest = ({ userId, status }) => ({
  type: ACTION_TYPES.SET_ONLINE_STATUS_REQUEST,
  payload: { userId, status },
});
export const setOnlineStatusError = error => ({
  type: ACTION_TYPES.SET_ONLINE_STATUS_ERROR,
  payload: { error },
});
export const setOnlineStatus = ({ userId, status }) => ({
  type: ACTION_TYPES.SET_ONLINE_STATUS,
  payload: { userId, status },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getOnlineUsersRequest = userId => ({
  type: ACTION_TYPES.GET_ONLINE_USERS_REQUEST,
  payload: { userId },
});
export const getOnlineUsersError = error => ({
  type: ACTION_TYPES.GET_ONLINE_USERS_ERROR,
  payload: { error },
});
export const getOnlineUsers = users => ({
  type: ACTION_TYPES.GET_ONLINE_USERS,
  payload: { users },
});
