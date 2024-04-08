import { put } from 'redux-saga/effects';
import * as ActionsUser from '../actions/userCreators';
import * as API from '../api';
import * as WsApi from '../api/webSocket/socketEventController';

export function* getAuthUserSaga (action) {
  try {
    const {
      data: {
        data: { user },
      },
    } = yield API.getAuthUser();
    yield put(ActionsUser.getAuthUserSuccess(user));
  } catch (error) {
    yield put(
      ActionsUser.getAuthUserError({
        message: error.response.data.message,
        status: error.response.status,
      })
    );
  }
}

export function* updateUserSaga (action) {
  try {
    const {
      data: { data: user },
    } = yield API.updateUser(action.payload);
    yield put(ActionsUser.updateUserSuccess(user));
  } catch (error) {
    yield put(
      ActionsUser.updateUserError({
        message: error.response.data.message,
        status: error.response.status,
      })
    );
  }
}

export function* getUsersSaga (action) {
  try {
    const {
      data: {
        data: { users },
      },
    } = yield API.getUsers();
    yield put(ActionsUser.getUsersSuccess(users));
  } catch (error) {
    yield put(ActionsUser.getUsersError(error));
  }
}

export function* getUserSaga (action) {
  try {
    const {
      data: {
        data: { userData },
      },
    } = yield API.getUserProfile(action.payload);
    yield put(ActionsUser.getUserSuccess(userData));
  } catch (error) {
    yield put(
      ActionsUser.getUserError({
        message: error.response.data.message,
        status: error.response.status,
      })
    );
  }
}

export function* subscribeUserSaga (action) {
  try {
    yield API.subscribeUser(action.payload);
    yield put(ActionsUser.subscribeUserSuccess());
  } catch (error) {
    yield put(ActionsUser.subscribeUserError(error));
  }
}

export function* unsubscribeUserSaga (action) {
  try {
    yield API.unsubscribeUser(action.payload);
    yield put(ActionsUser.unsubscribeUserSuccess());
  } catch (error) {
    yield put(ActionsUser.unsubscribeUserError(error));
  }
}

export function* getUserFollowersSaga (action) {
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
    yield put(ActionsUser.getUserFollowersError(error));
  }
}

export function* getUserFollowingSaga (action) {
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
    yield put(ActionsUser.getUserFollowingError(error));
  }
}

export function* setOnlineStatusSaga (action) {
  try {
    yield WsApi.setOnlineStatus(action.payload);
  } catch (error) {
    yield put(ActionsUser.setOnlineStatusError(error));
  }
}

export function* subscribeUserProfileSaga (action) {
  try {
    yield WsApi.subscribeUserProfile(action.payload);
  } catch (error) {
    yield put(ActionsUser.subscribeUserProfileError(error));
  }
}

export function* unsubscribeUserProfileSaga (action) {
  try {
    yield WsApi.unsubscribeUserProfile(action.payload);
  } catch (error) {
    yield put(ActionsUser.unsubscribeUserProfileError(error));
  }
}

export function* getOnlineUsersSaga (action) {
  try {
    yield WsApi.getOnlineUsers(action.payload);
  } catch (error) {
    yield put(ActionsUser.getOnlineUsersError(error));
  }
}
