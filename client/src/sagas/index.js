import { takeLatest, takeEvery, takeLeading } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/type';
import { signInSaga, signUpSaga } from './authSagas';
import {
  getAuthUserSaga,
  updateUserSaga,
  getUsersSaga,
  getUserSaga,
  subscribeUserSaga,
  unsubscribeUserSaga,
  setOnlineStatusSaga,
  getOnlineStatusSaga,
  subscribeUserProfileSaga,
  unsubscribeUserProfileSaga,
  getOnlineUsersSaga,
  getUserFollowersSaga,
  getUserFollowingSaga,
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
  deleteMessageSaga,
  replyMessageSaga,
  forwardMessageSaga,
  getChatsOnReconnectSaga,
  getMessagesOnReconnectSaga,
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
  yield takeLatest(ACTION_TYPES.GET_ONLINE_STATUS_REQUEST, getOnlineStatusSaga);
  yield takeLatest(ACTION_TYPES.SUBSCRIBE_CHATS_REQUEST, subscribeChatsSaga);
  yield takeLatest(ACTION_TYPES.GET_ONLINE_USERS_REQUEST, getOnlineUsersSaga);
  yield takeLatest(ACTION_TYPES.START_TYPING_REQUEST, startTypingSaga);
  yield takeLatest(ACTION_TYPES.STOP_TYPING_REQUEST, stopTypingSaga);
  yield takeLatest(ACTION_TYPES.SET_SEEN_MESSAGE_REQUEST, setSeenMessageSaga);
  yield takeLatest(ACTION_TYPES.START_DIALOG_REQUEST, startDialogSaga);
  yield takeLatest(ACTION_TYPES.EDIT_MESSAGE_REQUEST, editMessageSaga);
  yield takeLatest(ACTION_TYPES.DELETE_MESSAGE_REQUEST, deleteMessageSaga);
  yield takeLatest(ACTION_TYPES.REPLY_MESSAGE_REQUEST, replyMessageSaga);
  yield takeLatest(ACTION_TYPES.FORWARD_MESSAGE_REQUEST, forwardMessageSaga);
  yield takeLatest(
    ACTION_TYPES.GET_CHATS_ON_RECONNECT_REQUEST,
    getChatsOnReconnectSaga
  );
  yield takeLatest(
    ACTION_TYPES.GET_MESSAGES_ON_RECONNECT_REQUEST,
    getMessagesOnReconnectSaga
  );
  yield takeLatest(ACTION_TYPES.GET_USER_REQUEST, getUserSaga);
  yield takeLatest(ACTION_TYPES.SUBSCRIBE_USER_REQUEST, subscribeUserSaga);
  yield takeLatest(ACTION_TYPES.UNSUBSCRIBE_USER_REQUEST, unsubscribeUserSaga);
  yield takeLatest(
    ACTION_TYPES.SUBSCRIBE_USER_PROFILE_REQUEST,
    subscribeUserProfileSaga
  );
  yield takeLatest(
    ACTION_TYPES.UNSUBSCRIBE_USER_PROFILE_REQUEST,
    unsubscribeUserProfileSaga
  );
  yield takeLatest(
    ACTION_TYPES.GET_USER_FOLLOWERS_REQUEST,
    getUserFollowersSaga
  );
  yield takeLatest(
    ACTION_TYPES.GET_USER_FOLLOWING_REQUEST,
    getUserFollowingSaga
  );
}

export default rootSaga;
