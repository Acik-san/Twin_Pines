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
  createMessageSaga,
  getMessagesSaga,
  getChatsSaga,
  subscribeChatsSaga,
  startTypingSaga,
  stopTypingSaga,
  setSeenMessageSaga,
  startDialogSaga,
  editMessageSaga,
} from './chatSagas';

function* rootSaga () {
  yield takeLatest(ACTION_TYPES.SIGN_IN_REQUEST, signInSaga);
  yield takeLatest(ACTION_TYPES.SIGN_UP_REQUEST, signUpSaga);
  yield takeLatest(ACTION_TYPES.GET_AUTH_USER_REQUEST, getAuthUserSaga);
  yield takeLatest(ACTION_TYPES.GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_USER_REQUEST, updateUserSaga);
  yield takeLatest(ACTION_TYPES.CREATE_MESSAGE_REQUEST, createMessageSaga);
  yield takeLatest(ACTION_TYPES.GET_MESSAGES_REQUEST, getMessagesSaga);
  yield takeLatest(ACTION_TYPES.GET_CHATS_REQUEST, getChatsSaga);
  yield takeLatest(ACTION_TYPES.SET_ONLINE_STATUS_REQUEST, setOnlineStatusSaga);
  yield takeLatest(ACTION_TYPES.SUBSCRIBE_CHATS_REQUEST, subscribeChatsSaga);
  yield takeLatest(ACTION_TYPES.GET_ONLINE_USERS_REQUEST, getOnlineUsersSaga);
  yield takeLatest(ACTION_TYPES.START_TYPING_REQUEST, startTypingSaga);
  yield takeLatest(ACTION_TYPES.STOP_TYPING_REQUEST, stopTypingSaga);
  yield takeLatest(ACTION_TYPES.SET_SEEN_MESSAGE_REQUEST, setSeenMessageSaga);
  yield takeLatest(ACTION_TYPES.START_DIALOG_REQUEST, startDialogSaga);
  yield takeLatest(ACTION_TYPES.EDIT_MESSAGE_REQUEST, editMessageSaga);
}

export default rootSaga;
