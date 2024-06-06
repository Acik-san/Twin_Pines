import { put } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  GetAuthUserRequestAction,
  GetOnlineStatusRequestAction,
  GetOnlineUsersRequestAction,
  GetUserFollowersRequestAction,
  GetUserFollowingRequestAction,
  GetUserRequestAction,
  GetUsersRequestAction,
  SetOnlineStatusRequestAction,
  SubscribeUserProfileRequestAction,
  SubscribeUserRequestAction,
  UnsubscribeUserProfileRequestAction,
  UnsubscribeUserRequestAction,
  UpdateUserRequestAction,
} from '../types/userActionTypes';
import * as ActionsUser from '../actions/userCreators';
import * as API from '../api';
import * as WsApi from '../api/webSocket/socketEventController';

export function* getAuthUserSaga (action: GetAuthUserRequestAction) {
  try {
    const {
      data: {
        data: { user },
      },
    } = yield API.getAuthUser();
    yield put(ActionsUser.getAuthUserSuccess(user));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.getAuthUserError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* updateUserSaga (action: UpdateUserRequestAction) {
  try {
    const {
      data: { data: user },
    } = yield API.updateUser(action.payload);
    yield put(ActionsUser.updateUserSuccess(user));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.updateUserError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* getUsersSaga (action: GetUsersRequestAction) {
  try {
    const {
      data: {
        data: { users },
      },
    } = yield API.getUsers();
    yield put(ActionsUser.getUsersSuccess(users));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.getUsersError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* getUserSaga (action: GetUserRequestAction) {
  try {
    const {
      data: {
        data: { userData },
      },
    } = yield API.getUserProfile(action.payload.userName);
    yield put(ActionsUser.getUserSuccess(userData));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.getUserError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* subscribeUserSaga (action: SubscribeUserRequestAction) {
  try {
    yield API.subscribeUser(action.payload.targetId);
    yield put(ActionsUser.subscribeUserSuccess());
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.subscribeUserError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* unsubscribeUserSaga (action: UnsubscribeUserRequestAction) {
  try {
    yield API.unsubscribeUser(action.payload.targetId);
    yield put(ActionsUser.unsubscribeUserSuccess());
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.unsubscribeUserError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* getUserFollowersSaga (action: GetUserFollowersRequestAction) {
  try {
    const {
      data: {
        data: { followers, haveMoreSubscriptions },
      },
    } = yield API.getUserFollowers(action.payload);
    yield put(
      ActionsUser.getUserFollowersSuccess({ followers, haveMoreSubscriptions })
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.getUserFollowersError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* getUserFollowingSaga (action: GetUserFollowingRequestAction) {
  try {
    const {
      data: {
        data: { following, haveMoreSubscriptions },
      },
    } = yield API.getUserFollowing(action.payload);
    yield put(
      ActionsUser.getUserFollowingSuccess({ following, haveMoreSubscriptions })
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.getUserFollowingError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* setOnlineStatusSaga (action: SetOnlineStatusRequestAction) {
  try {
    yield WsApi.setOnlineStatus(action.payload);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.setOnlineStatusError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* getOnlineStatusSaga (action: GetOnlineStatusRequestAction) {
  try {
    yield WsApi.getOnlineStatus(action.payload);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.getOnlineStatusError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* subscribeUserProfileSaga (
  action: SubscribeUserProfileRequestAction
) {
  try {
    yield WsApi.subscribeUserProfile(action.payload);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.subscribeUserProfileError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* unsubscribeUserProfileSaga (
  action: UnsubscribeUserProfileRequestAction
) {
  try {
    yield WsApi.unsubscribeUserProfile(action.payload);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsUser.unsubscribeUserProfileError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

// export function* getOnlineUsersSaga (action: GetOnlineUsersRequestAction) {
//   try {
//     yield WsApi.getOnlineUsers(action.payload);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       yield put(
//         ActionsUser.getOnlineUsersError({
//           message: error.response?.data.message,
//           status: error.response?.status,
//         })
//       );
//     }
//   }
// }
