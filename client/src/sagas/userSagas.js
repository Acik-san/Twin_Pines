import { put } from "redux-saga/effects";
import * as ActionsUser from "../actions/userCreators";
import * as API from "../api";

export function* getAuthUserSaga (action) {
  try {
    const {
      data: {
        data: { user },
      },
    } = yield API.getAuthUser();
    yield put(ActionsUser.getAuthUserSuccess(user));
  } catch (error) {
    yield put(ActionsUser.getAuthUserError(error));
  }
}

export function* updateUserSaga(action) {
  try {
    const {
      data: { data: user },
    } = yield API.updateUser(action.payload);
    yield put(ActionsUser.updateUserSuccess(user));
  } catch (error) {
    yield put(ActionsUser.updateUserError(error));
  }
}

