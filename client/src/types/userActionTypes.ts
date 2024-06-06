import { IError, IUserData } from '.';
import ACTION_TYPES from '../actions/type';

export interface GetAuthUserRequestAction {
  type: typeof ACTION_TYPES.GET_AUTH_USER_REQUEST;
  payload: {};
}
export interface GetAuthUserSuccessAction {
  type: typeof ACTION_TYPES.GET_AUTH_USER_SUCCESS;
  payload: { user: IUserData };
}
export interface GetAuthUserErrorAction {
  type: typeof ACTION_TYPES.GET_AUTH_USER_ERROR;
  payload: { error: IError };
}
export interface UpdateUserRequestAction {
  type: typeof ACTION_TYPES.UPDATE_USER_REQUEST;
  payload: { id: number; values: { [key: string]: string | {} } };
}
export interface UpdateUserSuccessAction {
  type: typeof ACTION_TYPES.UPDATE_USER_SUCCESS;
  payload: { user: IUserData };
}
export interface UpdateUserErrorAction {
  type: typeof ACTION_TYPES.UPDATE_USER_ERROR;
  payload: { error: IError };
}
export interface GetUsersRequestAction {
  type: typeof ACTION_TYPES.GET_USERS_REQUEST;
  payload: {};
}
export interface GetUsersSuccessAction {
  type: typeof ACTION_TYPES.GET_USERS_SUCCESS;
  payload: { users: IUserData[] };
}
export interface GetUsersErrorAction {
  type: typeof ACTION_TYPES.GET_USERS_ERROR;
  payload: { error: IError };
}
export interface GetUserRequestAction {
  type: typeof ACTION_TYPES.GET_USER_REQUEST;
  payload: { userName: string };
}
export interface GetUserSuccessAction {
  type: typeof ACTION_TYPES.GET_USER_SUCCESS;
  payload: { userData: IUserData };
}
export interface GetUserErrorAction {
  type: typeof ACTION_TYPES.GET_USER_ERROR;
  payload: { error: IError };
}
export interface SubscribeUserRequestAction {
  type: typeof ACTION_TYPES.SUBSCRIBE_USER_REQUEST;
  payload: { targetId: number };
}
export interface SubscribeUserSuccessAction {
  type: typeof ACTION_TYPES.SUBSCRIBE_USER_SUCCESS;
  payload: {};
}
export interface SubscribeUserErrorAction {
  type: typeof ACTION_TYPES.SUBSCRIBE_USER_ERROR;
  payload: { error: IError };
}
export interface UnsubscribeUserRequestAction {
  type: typeof ACTION_TYPES.UNSUBSCRIBE_USER_REQUEST;
  payload: { targetId: number };
}
export interface UnsubscribeUserSuccessAction {
  type: typeof ACTION_TYPES.UNSUBSCRIBE_USER_SUCCESS;
  payload: {};
}
export interface UnsubscribeUserErrorAction {
  type: typeof ACTION_TYPES.UNSUBSCRIBE_USER_ERROR;
  payload: { error: IError };
}
export interface GetUserFollowersRequestAction {
  type: typeof ACTION_TYPES.GET_USER_FOLLOWERS_REQUEST;
  payload: {
    userName: string;
    subscriptionsLimit: number;
    subscriptionsOffset: number;
  };
}
export interface GetUserFollowersSuccessAction {
  type: typeof ACTION_TYPES.GET_USER_FOLLOWERS_SUCCESS;
  payload: { followers: IUserData[]; haveMoreSubscriptions: boolean };
}
export interface GetUserFollowersErrorAction {
  type: typeof ACTION_TYPES.GET_USER_FOLLOWERS_ERROR;
  payload: { error: IError };
}
export interface GetUserFollowingRequestAction {
  type: typeof ACTION_TYPES.GET_USER_FOLLOWING_REQUEST;
  payload: {
    userName: string;
    subscriptionsLimit: number;
    subscriptionsOffset: number;
  };
}
export interface GetUserFollowingSuccessAction {
  type: typeof ACTION_TYPES.GET_USER_FOLLOWING_SUCCESS;
  payload: { following: IUserData[]; haveMoreSubscriptions: boolean };
}
export interface GetUserFollowingErrorAction {
  type: typeof ACTION_TYPES.GET_USER_FOLLOWING_ERROR;
  payload: { error: IError };
}
export interface CleanUserProfileAction {
  type: typeof ACTION_TYPES.CLEAN_USER_PROFILE;
  payload: {};
}
export interface CleanProfileSubscriptionsAction {
  type: typeof ACTION_TYPES.CLEAN_PROFILE_SUBSCRIPTIONS;
  payload: {};
}
export interface SetOnlineStatusRequestAction {
  type: typeof ACTION_TYPES.SET_ONLINE_STATUS_REQUEST;
  payload: { userId: number; status: string };
}
export interface SetOnlineStatusErrorAction {
  type: typeof ACTION_TYPES.SET_ONLINE_STATUS_ERROR;
  payload: { error: IError };
}
export interface SetOnlineStatusAction {
  type: typeof ACTION_TYPES.SET_ONLINE_STATUS;
  payload: { userId: number; status: string };
}
export interface GetOnlineStatusRequestAction {
  type: typeof ACTION_TYPES.GET_ONLINE_STATUS_REQUEST;
  payload: { userId: number };
}
export interface GetOnlineStatusErrorAction {
  type: typeof ACTION_TYPES.GET_ONLINE_STATUS_ERROR;
  payload: { error: IError };
}
export interface GetOnlineStatusAction {
  type: typeof ACTION_TYPES.GET_ONLINE_STATUS;
  payload: { onlineStatusInfo: { onlineStatus: string; lastSeen: string } };
}
export interface SubscribeUserProfileRequestAction {
  type: typeof ACTION_TYPES.SUBSCRIBE_USER_PROFILE_REQUEST;
  payload: { userId: number };
}
export interface SubscribeUserProfileErrorAction {
  type: typeof ACTION_TYPES.SUBSCRIBE_USER_PROFILE_ERROR;
  payload: { error: IError };
}
export interface UnsubscribeUserProfileRequestAction {
  type: typeof ACTION_TYPES.UNSUBSCRIBE_USER_PROFILE_REQUEST;
  payload: { userId: number };
}
export interface UnsubscribeUserProfileErrorAction {
  type: typeof ACTION_TYPES.UNSUBSCRIBE_USER_PROFILE_ERROR;
  payload: { error: IError };
}
export interface GetOnlineUsersRequestAction {
  type: typeof ACTION_TYPES.GET_ONLINE_USERS_REQUEST;
  payload: { userId: number };
}
export interface GetOnlineUsersErrorAction {
  type: typeof ACTION_TYPES.GET_ONLINE_USERS_ERROR;
  payload: { error: IError };
}
export interface GetOnlineUsersAction {
  type: typeof ACTION_TYPES.GET_ONLINE_USERS;
  payload: { users: IUserData[] };
}
