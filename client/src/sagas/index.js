import { takeLatest } from "redux-saga/effects";
import ACTION_TYPES from "../actions/type";
import {
  createUserSaga,
  getUsersSaga,
  getUserSaga,
  updateUserSaga,
  deleteUserSaga,
  getSumUserSaga,
} from "./userSagas";
import {
  createTaskSaga,
  getTasksSaga,
  getTaskSaga,
  updateTaskSaga,
  deleteTaskSaga,
  getAllTasksSaga,
  getSumTasksSaga,
} from "./taskSagas";

function* rootSaga() {
  yield takeLatest(ACTION_TYPES.CREATE_USER_REQUEST, createUserSaga);
  yield takeLatest(ACTION_TYPES.GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(ACTION_TYPES.GET_USER_REQUEST, getUserSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_USER_REQUEST, updateUserSaga);
  yield takeLatest(ACTION_TYPES.DELETE_USER_REQUEST, deleteUserSaga);
  yield takeLatest(ACTION_TYPES.GET_SUM_USERS_REQUEST, getSumUserSaga);
  yield takeLatest(ACTION_TYPES.CREATE_TASK_REQUEST, createTaskSaga);
  yield takeLatest(ACTION_TYPES.GET_TASKS_REQUEST, getTasksSaga);
  yield takeLatest(ACTION_TYPES.GET_TASK_REQUEST, getTaskSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_TASK_REQUEST, updateTaskSaga);
  yield takeLatest(ACTION_TYPES.DELETE_TASK_REQUEST, deleteTaskSaga);
  yield takeLatest(ACTION_TYPES.GET_ALL_TASKS_REQUEST, getAllTasksSaga);
  yield takeLatest(ACTION_TYPES.GET_SUM_TASKS_REQUEST, getSumTasksSaga);
}

export default rootSaga;
