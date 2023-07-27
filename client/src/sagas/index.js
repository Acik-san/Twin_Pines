import { takeLatest, takeEvery, takeLeading } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/type';
import { signInSaga, signUpSaga } from './authSagas';
import {
  getAuthUserSaga,
  updateUserSaga,
  getUsersSaga,
  setOnlineStatusSaga,
  getOnlineUsersSaga,
} from './userSagas';
import {
  createTaskSaga,
  getTasksSaga,
  getTaskSaga,
  updateTaskSaga,
  deleteTaskSaga,
} from './taskSagas';
import {
  createMessageSaga,
  getMessagesSaga,
  getChatsSaga,
  subscribeChatsSaga,
  startTypingSaga,
  stopTypingSaga,
  setSeenMessageSaga,
} from './chatSagas';

function* rootSaga () {
  yield takeLatest(ACTION_TYPES.SIGN_IN_REQUEST, signInSaga);
  yield takeLatest(ACTION_TYPES.SIGN_UP_REQUEST, signUpSaga);
  yield takeLatest(ACTION_TYPES.GET_AUTH_USER_REQUEST, getAuthUserSaga);
  yield takeLatest(ACTION_TYPES.GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_USER_REQUEST, updateUserSaga);
  yield takeLatest(ACTION_TYPES.CREATE_TASK_REQUEST, createTaskSaga);
  yield takeLatest(ACTION_TYPES.GET_TASKS_REQUEST, getTasksSaga);
  yield takeLatest(ACTION_TYPES.GET_TASK_REQUEST, getTaskSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_TASK_REQUEST, updateTaskSaga);
  yield takeLatest(ACTION_TYPES.DELETE_TASK_REQUEST, deleteTaskSaga);
  yield takeLatest(ACTION_TYPES.CREATE_MESSAGE_REQUEST, createMessageSaga);
  yield takeLatest(ACTION_TYPES.GET_MESSAGES_REQUEST, getMessagesSaga);
  yield takeLatest(ACTION_TYPES.GET_CHATS_REQUEST, getChatsSaga);
  yield takeLatest(ACTION_TYPES.SET_ONLINE_STATUS_REQUEST, setOnlineStatusSaga);
  yield takeLatest(ACTION_TYPES.SUBSCRIBE_CHATS_REQUEST, subscribeChatsSaga);
  yield takeLatest(ACTION_TYPES.GET_ONLINE_USERS_REQUEST, getOnlineUsersSaga);
  yield takeLatest(ACTION_TYPES.START_TYPING_REQUEST, startTypingSaga);
  yield takeLatest(ACTION_TYPES.STOP_TYPING_REQUEST, stopTypingSaga);
  yield takeLatest(ACTION_TYPES.SET_SEEN_MESSAGE_REQUEST, setSeenMessageSaga);
}

export default rootSaga;
