import { takeLatest, takeEvery, takeLeading } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/type';
import {
  signInSaga,
  signUpSaga,
} from './authSagas';
import {
  getAuthUserSaga,
  updateUserSaga,
} from './userSagas';
import {
  createTaskSaga,
  getTasksSaga,
  getTaskSaga,
  updateTaskSaga,
  deleteTaskSaga,
} from './taskSagas';

function* rootSaga () {
  yield takeLatest(ACTION_TYPES.SIGN_IN_REQUEST, signInSaga);
  yield takeLatest(ACTION_TYPES.SIGN_UP_REQUEST, signUpSaga);
  yield takeLatest(ACTION_TYPES.GET_AUTH_USER_REQUEST, getAuthUserSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_USER_REQUEST, updateUserSaga);
  yield takeLatest(ACTION_TYPES.CREATE_TASK_REQUEST, createTaskSaga);
  yield takeLatest(ACTION_TYPES.GET_TASKS_REQUEST, getTasksSaga);
  yield takeLatest(ACTION_TYPES.GET_TASK_REQUEST, getTaskSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_TASK_REQUEST, updateTaskSaga);
  yield takeLatest(ACTION_TYPES.DELETE_TASK_REQUEST, deleteTaskSaga);
}

export default rootSaga;
