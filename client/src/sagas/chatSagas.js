import { put } from 'redux-saga/effects';
import * as ActionsChats from '../actions/chatsCreator';
import * as API from '../api';
import * as WsApi from '../api/webSocket/socketEventController';

export function* createMessageSaga (action) {
  try {
    yield WsApi.createMessage(action.payload);
    // yield put(ActionsChats.createMessageSuccess(message));
  } catch (error) {
    yield put(ActionsChats.createMessageError(error));
  }
}

export function* getMessagesSaga (action) {
  try {
    const {
      data: {
        data: { messages },
      },
    } = yield API.getMessages(action.payload.id);
    yield put(ActionsChats.getMessagesSuccess(messages));
  } catch (error) {
    yield put(ActionsChats.getMessagesError(error));
  }
}

export function* getChatsSaga (action) {
  try {
    const {
      data: {
        data: { conversations },
      },
    } = yield API.getChats();
    yield put(ActionsChats.getChatsSuccess(conversations));
  } catch (error) {
    yield put(ActionsChats.getChatsError(error));
  }
}

export function* subscribeChatsSaga (action) {
  try {
    yield WsApi.subscribeChats(action.payload);
    // yield put(ActionsChats.createMessageSuccess(message));
  } catch (error) {
    yield put(ActionsChats.subscribeChatsError(error));
  }
}

export function* startTypingSaga (action) {
  try {
    yield WsApi.startTyping(action.payload.conversationId);
  } catch (error) {
    yield put(ActionsChats.startTypingError(error));
  }
}
export function* stopTypingSaga (action) {
  try {
    yield WsApi.stopTyping(action.payload.conversationId);
  } catch (error) {
    yield put(ActionsChats.stopTypingError(error));
  }
}
