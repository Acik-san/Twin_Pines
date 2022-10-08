import { put } from "redux-saga/effects";
import * as ActionsUser from "../actions/userCreators";
import * as API from "../api";

export function* createUserSaga(action) {
  try {
    const {
      data: { data: user },
    } = yield API.createUser(action.payload.values);
    yield put(ActionsUser.createUserSuccess(user));
  } catch (error) {
    yield put(ActionsUser.createUserError(error));
  }
}
export function* getUsersSaga(action) {
  try {
    const {
      data: { data: users },
    } = yield API.getUsers(action.payload);
    yield put(ActionsUser.getUsersSuccess(users));
  } catch (error) {
    yield put(ActionsUser.getUsersError(error));
  }
}
export function* getUserSaga(action) {
  try {
    const {
      data: { data: user },
    } = yield API.getUser(action.payload.id);
    yield put(ActionsUser.getUserSuccess(user));
  } catch (error) {
    yield put(ActionsUser.getUserError(error));
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
export function* deleteUserSaga(action) {
  try {
    const {
      data: { data: user },
    } = yield API.deleteUser(action.payload.id);
    yield put(ActionsUser.deleteUserSuccess(user));
  } catch (error) {
    yield put(ActionsUser.deleteUserError(error));
  }
}

