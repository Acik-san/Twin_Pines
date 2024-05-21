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
export const getUserRequest = userName => ({
  type: ACTION_TYPES.GET_USER_REQUEST,
  payload: { userName },
});
export const getUserSuccess = userData => ({
  type: ACTION_TYPES.GET_USER_SUCCESS,
  payload: { userData },
});
export const getUserError = error => ({
  type: ACTION_TYPES.GET_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const subscribeUserRequest = targetId => ({
  type: ACTION_TYPES.SUBSCRIBE_USER_REQUEST,
  payload: { targetId },
});
export const subscribeUserSuccess = () => ({
  type: ACTION_TYPES.SUBSCRIBE_USER_SUCCESS,
  payload: {},
});
export const subscribeUserError = error => ({
  type: ACTION_TYPES.SUBSCRIBE_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const unsubscribeUserRequest = targetId => ({
  type: ACTION_TYPES.UNSUBSCRIBE_USER_REQUEST,
  payload: { targetId },
});
export const unsubscribeUserSuccess = () => ({
  type: ACTION_TYPES.UNSUBSCRIBE_USER_SUCCESS,
  payload: {},
});
export const unsubscribeUserError = error => ({
  type: ACTION_TYPES.UNSUBSCRIBE_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getUserFollowersRequest = (
  userName,
  subscriptionsLimit,
  subscriptionsOffset
) => ({
  type: ACTION_TYPES.GET_USER_FOLLOWERS_REQUEST,
  payload: { userName, subscriptionsLimit, subscriptionsOffset },
});
export const getUserFollowersSuccess = ({
  followers,
  haveMoreSubscriptions,
}) => ({
  type: ACTION_TYPES.GET_USER_FOLLOWERS_SUCCESS,
  payload: { followers, haveMoreSubscriptions },
});
export const getUserFollowersError = error => ({
  type: ACTION_TYPES.GET_USER_FOLLOWERS_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getUserFollowingRequest = (
  userName,
  subscriptionsLimit,
  subscriptionsOffset
) => ({
  type: ACTION_TYPES.GET_USER_FOLLOWING_REQUEST,
  payload: { userName, subscriptionsLimit, subscriptionsOffset },
});
export const getUserFollowingSuccess = ({
  following,
  haveMoreSubscriptions,
}) => ({
  type: ACTION_TYPES.GET_USER_FOLLOWING_SUCCESS,
  payload: { following, haveMoreSubscriptions },
});
export const getUserFollowingError = error => ({
  type: ACTION_TYPES.GET_USER_FOLLOWING_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const cleanUserProfile = () => ({
  type: ACTION_TYPES.CLEAN_USER_PROFILE,
  payload: {},
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const cleanProfileSubscriptions = () => ({
  type: ACTION_TYPES.CLEAN_PROFILE_SUBSCRIPTIONS,
  payload: {},
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
export const getOnlineStatusRequest = userId => ({
  type: ACTION_TYPES.GET_ONLINE_STATUS_REQUEST,
  payload: { userId },
});
export const getOnlineStatusError = error => ({
  type: ACTION_TYPES.GET_ONLINE_STATUS_ERROR,
  payload: { error },
});
export const getOnlineStatus = onlineStatusInfo => ({
  type: ACTION_TYPES.GET_ONLINE_STATUS,
  payload: { onlineStatusInfo },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const subscribeUserProfileRequest = userId => ({
  type: ACTION_TYPES.SUBSCRIBE_USER_PROFILE_REQUEST,
  payload: { userId },
});
export const subscribeUserProfileError = error => ({
  type: ACTION_TYPES.SUBSCRIBE_USER_PROFILE_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const unsubscribeUserProfileRequest = userId => ({
  type: ACTION_TYPES.UNSUBSCRIBE_USER_PROFILE_REQUEST,
  payload: { userId },
});
export const unsubscribeUserProfileError = error => ({
  type: ACTION_TYPES.UNSUBSCRIBE_USER_PROFILE_ERROR,
  payload: { error },
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
