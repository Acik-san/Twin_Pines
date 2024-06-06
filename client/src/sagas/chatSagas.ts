import { put } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  CreateMessageRequestAction,
  DeleteMessageRequestAction,
  EditMessageRequestAction,
  ForwardMessageRequestAction,
  GetChatsOnReconnectRequestAction,
  GetChatsRequestAction,
  GetMessagesOnReconnectRequestAction,
  GetMessagesRequestAction,
  ReplyMessageRequestAction,
  SetSeenMessageRequestAction,
  StartDialogRequestAction,
  StartTypingRequestAction,
  StopTypingRequestAction,
  SubscribeChatsRequestAction,
} from '../types/chatActionTypes';
import { IError } from '../types';
import * as ActionsChats from '../actions/chatsCreator';
import * as API from '../api';
import * as WsApi from '../api/webSocket/socketEventController';

export function* createMessageSaga (action: CreateMessageRequestAction) {
  try {
    yield WsApi.createMessage(action.payload);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.createMessageError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* getMessagesSaga (action: GetMessagesRequestAction) {
  try {
    const {
      data: {
        data: { messages, haveMore },
      },
    } = yield API.getMessages(action.payload);
    yield put(ActionsChats.getMessagesSuccess({ messages, haveMore }));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.getMessagesError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* getChatsSaga (action: GetChatsRequestAction) {
  try {
    const {
      data: {
        data: { conversations, unreadMessages },
      },
    } = yield API.getChats();
    yield put(ActionsChats.getChatsSuccess({ conversations, unreadMessages }));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.getChatsError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* subscribeChatsSaga (action: SubscribeChatsRequestAction) {
  try {
    yield WsApi.subscribeChats(action.payload);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.subscribeChatsError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* startTypingSaga (action: StartTypingRequestAction) {
  try {
    yield WsApi.startTyping(action.payload.conversationId);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.startTypingError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}
export function* stopTypingSaga (action: StopTypingRequestAction) {
  try {
    yield WsApi.stopTyping(action.payload.conversationId);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.stopTypingError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* setSeenMessageSaga (action: SetSeenMessageRequestAction) {
  try {
    yield WsApi.setSeenMessage(action.payload.messageId);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.setSeenMessageError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* startDialogSaga (action: StartDialogRequestAction) {
  const { userId, interlocutorId, userName, avatar } = action.payload;
  try {
    const {
      data: {
        data: { conversation },
      },
    } = yield API.startDialog(userId, interlocutorId);
    yield put(
      ActionsChats.startDialogSuccess({
        conversationId: conversation,
        interlocutorId,
        userName,
        avatar,
      })
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.startDialogError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* editMessageSaga (action: EditMessageRequestAction) {
  try {
    yield WsApi.editMessage(action.payload.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.editMessageError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* deleteMessageSaga (action: DeleteMessageRequestAction) {
  try {
    yield WsApi.deleteMessage(action.payload.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.deleteMessageError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* replyMessageSaga (action: ReplyMessageRequestAction) {
  try {
    yield WsApi.replyMessage(action.payload.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.replyMessageError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* forwardMessageSaga (action: ForwardMessageRequestAction) {
  try {
    yield WsApi.forwardMessage(action.payload.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.forwardMessageError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* getChatsOnReconnectSaga (
  action: GetChatsOnReconnectRequestAction
) {
  try {
    const {
      data: { data },
    } = yield API.getChats();
    yield put(ActionsChats.getChatsOnReconnectSuccess(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.getChatsOnReconnectError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* getMessagesOnReconnectSaga (
  action: GetMessagesOnReconnectRequestAction
) {
  try {
    const {
      data: { data },
    } = yield API.getMessagesOnReconnect(action.payload.data);
    yield put(ActionsChats.getMessagesOnReconnectSuccess(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsChats.getMessagesOnReconnectError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}
