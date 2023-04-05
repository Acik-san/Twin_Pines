import { put } from 'redux-saga/effects';
import * as ActionsAuth from '../actions/authCreators';
import * as API from '../api';

export function* signInSaga (action) {
  try {
    const {
      data: {
        data: { user },
      },
    } = yield API.signIn(action.payload.values);
    yield put(ActionsAuth.signInSuccess(user));
  } catch (error) {
    yield put(ActionsAuth.signInError(error));
  }
}

export function* signUpSaga (action) {
  try {
    const {
      data: {
        data: { user },
      },
    } = yield API.signUp(action.payload.values);
    yield put(ActionsAuth.signUpSuccess(user));
  } catch (error) {
    yield put(ActionsAuth.signUpError(error));
  }
}

export function* logoutSaga (action) {
  try {
  } catch (error) {}
}

export function* refreshSaga (action) {
  try {
    const {
      data: {
        data: { user, tokenPair },
      },
    } = yield API.refresh(action.payload.refreshToken);
    yield put(ActionsAuth.refreshSuccess(user, tokenPair));
  } catch (error) {
    yield put(ActionsAuth.refreshError(error));
  }
}
export function* getAuthUserSaga (action) {
  try {
    const {
      data: {
        data: { user },
      },
    } = yield API.getAuthUser();
    yield put(ActionsAuth.getAuthUserSuccess(user));
  } catch (error) {
    yield put(ActionsAuth.getAuthUserError(error));
  }
}
