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
    yield put(ActionsUser.getAuthUserError({
      message: error.response.data.message,
      status: error.response.status,
    }));
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

export function* setOnlineStatusSaga (action) {
  try {
    yield WsApi.setOnlineStatus(action.payload);
  } catch (error) {
    yield put(ActionsUser.setOnlineStatusError(error));
  }
}

export function* getOnlineUsersSaga (action) {
  try {
    yield WsApi.getOnlineUsers(action.payload);
  } catch (error) {
    yield put(ActionsUser.getOnlineUsersError(error));
  }
}
