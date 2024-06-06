import ACTION_TYPES from './type';
import { IError, IUserData } from '../types';
import {
  CleanProfileSubscriptionsAction,
  CleanUserProfileAction,
  GetAuthUserErrorAction,
  GetAuthUserRequestAction,
  GetAuthUserSuccessAction,
  GetOnlineStatusAction,
  GetOnlineStatusErrorAction,
  GetOnlineStatusRequestAction,
  GetOnlineUsersAction,
  GetOnlineUsersErrorAction,
  GetOnlineUsersRequestAction,
  GetUserErrorAction,
  GetUserFollowersErrorAction,
  GetUserFollowersRequestAction,
  GetUserFollowersSuccessAction,
  GetUserFollowingErrorAction,
  GetUserFollowingRequestAction,
  GetUserFollowingSuccessAction,
  GetUserRequestAction,
  GetUsersErrorAction,
  GetUsersRequestAction,
  GetUsersSuccessAction,
  GetUserSuccessAction,
  SetOnlineStatusAction,
  SetOnlineStatusErrorAction,
  SetOnlineStatusRequestAction,
  SubscribeUserErrorAction,
  SubscribeUserProfileErrorAction,
  SubscribeUserProfileRequestAction,
  SubscribeUserRequestAction,
  SubscribeUserSuccessAction,
  UnsubscribeUserErrorAction,
  UnsubscribeUserProfileErrorAction,
  UnsubscribeUserProfileRequestAction,
  UnsubscribeUserRequestAction,
  UnsubscribeUserSuccessAction,
  UpdateUserErrorAction,
  UpdateUserRequestAction,
  UpdateUserSuccessAction,
} from '../types/userActionTypes';

export const getAuthUserRequest = (): GetAuthUserRequestAction => ({
  type: ACTION_TYPES.GET_AUTH_USER_REQUEST,
  payload: {},
});
export const getAuthUserSuccess = (
  user: IUserData
): GetAuthUserSuccessAction => ({
  type: ACTION_TYPES.GET_AUTH_USER_SUCCESS,
  payload: { user },
});
export const getAuthUserError = (error: IError): GetAuthUserErrorAction => ({
  type: ACTION_TYPES.GET_AUTH_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const updateUserRequest = (
  id: number,
  values: { [key: string]: string | {} }
): UpdateUserRequestAction => ({
  type: ACTION_TYPES.UPDATE_USER_REQUEST,
  payload: { id, values },
});
export const updateUserSuccess = (
  user: IUserData
): UpdateUserSuccessAction => ({
  type: ACTION_TYPES.UPDATE_USER_SUCCESS,
  payload: { user },
});
export const updateUserError = (error: IError): UpdateUserErrorAction => ({
  type: ACTION_TYPES.UPDATE_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getUsersRequest = (): GetUsersRequestAction => ({
  type: ACTION_TYPES.GET_USERS_REQUEST,
  payload: {},
});
export const getUsersSuccess = (users: IUserData[]): GetUsersSuccessAction => ({
  type: ACTION_TYPES.GET_USERS_SUCCESS,
  payload: { users },
});
export const getUsersError = (error: IError): GetUsersErrorAction => ({
  type: ACTION_TYPES.GET_USERS_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getUserRequest = (userName: string): GetUserRequestAction => ({
  type: ACTION_TYPES.GET_USER_REQUEST,
  payload: { userName },
});
export const getUserSuccess = (userData: IUserData): GetUserSuccessAction => ({
  type: ACTION_TYPES.GET_USER_SUCCESS,
  payload: { userData },
});
export const getUserError = (error: IError): GetUserErrorAction => ({
  type: ACTION_TYPES.GET_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const subscribeUserRequest = (
  targetId: number
): SubscribeUserRequestAction => ({
  type: ACTION_TYPES.SUBSCRIBE_USER_REQUEST,
  payload: { targetId },
});
export const subscribeUserSuccess = (): SubscribeUserSuccessAction => ({
  type: ACTION_TYPES.SUBSCRIBE_USER_SUCCESS,
  payload: {},
});
export const subscribeUserError = (
  error: IError
): SubscribeUserErrorAction => ({
  type: ACTION_TYPES.SUBSCRIBE_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const unsubscribeUserRequest = (
  targetId: number
): UnsubscribeUserRequestAction => ({
  type: ACTION_TYPES.UNSUBSCRIBE_USER_REQUEST,
  payload: { targetId },
});
export const unsubscribeUserSuccess = (): UnsubscribeUserSuccessAction => ({
  type: ACTION_TYPES.UNSUBSCRIBE_USER_SUCCESS,
  payload: {},
});
export const unsubscribeUserError = (
  error: IError
): UnsubscribeUserErrorAction => ({
  type: ACTION_TYPES.UNSUBSCRIBE_USER_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getUserFollowersRequest = (
  userName: string,
  subscriptionsLimit: number,
  subscriptionsOffset: number
): GetUserFollowersRequestAction => ({
  type: ACTION_TYPES.GET_USER_FOLLOWERS_REQUEST,
  payload: { userName, subscriptionsLimit, subscriptionsOffset },
});
export const getUserFollowersSuccess = ({
  followers,
  haveMoreSubscriptions,
}: {
  followers: IUserData[];
  haveMoreSubscriptions: boolean;
}): GetUserFollowersSuccessAction => ({
  type: ACTION_TYPES.GET_USER_FOLLOWERS_SUCCESS,
  payload: { followers, haveMoreSubscriptions },
});
export const getUserFollowersError = (
  error: IError
): GetUserFollowersErrorAction => ({
  type: ACTION_TYPES.GET_USER_FOLLOWERS_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getUserFollowingRequest = (
  userName: string,
  subscriptionsLimit: number,
  subscriptionsOffset: number
): GetUserFollowingRequestAction => ({
  type: ACTION_TYPES.GET_USER_FOLLOWING_REQUEST,
  payload: { userName, subscriptionsLimit, subscriptionsOffset },
});
export const getUserFollowingSuccess = ({
  following,
  haveMoreSubscriptions,
}: {
  following: IUserData[];
  haveMoreSubscriptions: boolean;
}): GetUserFollowingSuccessAction => ({
  type: ACTION_TYPES.GET_USER_FOLLOWING_SUCCESS,
  payload: { following, haveMoreSubscriptions },
});
export const getUserFollowingError = (
  error: IError
): GetUserFollowingErrorAction => ({
  type: ACTION_TYPES.GET_USER_FOLLOWING_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const cleanUserProfile = (): CleanUserProfileAction => ({
  type: ACTION_TYPES.CLEAN_USER_PROFILE,
  payload: {},
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const cleanProfileSubscriptions =
  (): CleanProfileSubscriptionsAction => ({
    type: ACTION_TYPES.CLEAN_PROFILE_SUBSCRIPTIONS,
    payload: {},
  });
//-----------------------------------------------------------
//-----------------------------------------------------------
export const setOnlineStatusRequest = ({
  userId,
  status,
}: {
  userId: number;
  status: string;
}): SetOnlineStatusRequestAction => ({
  type: ACTION_TYPES.SET_ONLINE_STATUS_REQUEST,
  payload: { userId, status },
});
export const setOnlineStatusError = (
  error: IError
): SetOnlineStatusErrorAction => ({
  type: ACTION_TYPES.SET_ONLINE_STATUS_ERROR,
  payload: { error },
});
export const setOnlineStatus = ({
  userId,
  status,
}: {
  userId: number;
  status: string;
}): SetOnlineStatusAction => ({
  type: ACTION_TYPES.SET_ONLINE_STATUS,
  payload: { userId, status },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getOnlineStatusRequest = (
  userId: number
): GetOnlineStatusRequestAction => ({
  type: ACTION_TYPES.GET_ONLINE_STATUS_REQUEST,
  payload: { userId },
});
export const getOnlineStatusError = (
  error: IError
): GetOnlineStatusErrorAction => ({
  type: ACTION_TYPES.GET_ONLINE_STATUS_ERROR,
  payload: { error },
});
export const getOnlineStatus = (onlineStatusInfo: {
  onlineStatus: string;
  lastSeen: string;
}): GetOnlineStatusAction => ({
  type: ACTION_TYPES.GET_ONLINE_STATUS,
  payload: { onlineStatusInfo },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const subscribeUserProfileRequest = (
  userId: number
): SubscribeUserProfileRequestAction => ({
  type: ACTION_TYPES.SUBSCRIBE_USER_PROFILE_REQUEST,
  payload: { userId },
});
export const subscribeUserProfileError = (
  error: IError
): SubscribeUserProfileErrorAction => ({
  type: ACTION_TYPES.SUBSCRIBE_USER_PROFILE_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const unsubscribeUserProfileRequest = (
  userId: number
): UnsubscribeUserProfileRequestAction => ({
  type: ACTION_TYPES.UNSUBSCRIBE_USER_PROFILE_REQUEST,
  payload: { userId },
});
export const unsubscribeUserProfileError = (
  error: IError
): UnsubscribeUserProfileErrorAction => ({
  type: ACTION_TYPES.UNSUBSCRIBE_USER_PROFILE_ERROR,
  payload: { error },
});
//-----------------------------------------------------------
//-----------------------------------------------------------
export const getOnlineUsersRequest = (
  userId: number
): GetOnlineUsersRequestAction => ({
  type: ACTION_TYPES.GET_ONLINE_USERS_REQUEST,
  payload: { userId },
});
export const getOnlineUsersError = (
  error: IError
): GetOnlineUsersErrorAction => ({
  type: ACTION_TYPES.GET_ONLINE_USERS_ERROR,
  payload: { error },
});
export const getOnlineUsers = (users: IUserData[]): GetOnlineUsersAction => ({
  type: ACTION_TYPES.GET_ONLINE_USERS,
  payload: { users },
});
