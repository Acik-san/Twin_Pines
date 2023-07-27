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
        data: { messages, haveMore },
      },
    } = yield API.getMessages(action.payload);
    yield put(ActionsChats.getMessagesSuccess({ messages, haveMore }));
  } catch (error) {
    yield put(ActionsChats.getMessagesError(error));
  }
}

export function* getChatsSaga (action) {
  try {
    const {
      data: {
        data: { conversations,unreadMessages },
      },
    } = yield API.getChats();
    yield put(ActionsChats.getChatsSuccess({conversations,unreadMessages}));
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

export function* setSeenMessageSaga (action) {
  try {
    yield WsApi.setSeenMessage(action.payload.messageId);
  } catch (error) {
    yield put(ActionsChats.setSeenMessageError(error));
  }
}
