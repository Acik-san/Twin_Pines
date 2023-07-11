import produce from 'immer';
import { isEqual } from 'lodash';
import ACTION_TYPES from '../actions/type';

const initialState = {
  isFetching: false,
  error: null,
  messages: [],
  messagesPreview: [],
  currentDialog: null,
};
const handleRequests = produce(draftState => {
  draftState.isFetching = true;
});
const handleError = produce((draftState, action) => {
  const {
    payload: { error },
  } = action;
  draftState.isFetching = false;
  draftState.error = error;
});

const handlers = {
  [ACTION_TYPES.CREATE_MESSAGE_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_MESSAGES_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_CHATS_REQUEST]: handleRequests,
  [ACTION_TYPES.CREATE_MESSAGE_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { message, preview },
    } = action;
    draftState.isFetching = false;
    draftState.messages.push(message);
    let isNew = true;
    draftState.messagesPreview.forEach(conversation => {
      if (isEqual(conversation.participants, message.participants)) {
        conversation.body = message.body;
        conversation.sender = message.sender;
        conversation.createdAt = message.createdAt;
        conversation.interlocutor.status = preview.interlocutor.status;
        isNew = false;
      }
    });
    if (isNew) {
      draftState.messagesPreview.push(preview);
    }
  }),
  [ACTION_TYPES.GET_MESSAGES_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { messages },
    } = action;
    draftState.isFetching = false;
    draftState.messages.push(...messages);
  }),
  [ACTION_TYPES.GET_CHATS_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { conversations },
    } = action;
    draftState.isFetching = false;
    draftState.messagesPreview.push(...conversations);
  }),
  [ACTION_TYPES.CHOOSE_CURRENT_CHAT]: produce((draftState, action) => {
    const {
      payload: { conversationId, interlocutorId, login, avatar },
    } = action;
    draftState.isFetching = false;
    if (
      draftState.currentDialog?.conversationId !== conversationId &&
      draftState.currentDialog?.interlocutorId !== interlocutorId &&
      draftState.currentDialog?.login !== login
    ) {
      draftState.messages = [];
      draftState.currentDialog = {
        conversationId,
        interlocutorId,
        login,
        avatar,
      };
    }
  }),
  [ACTION_TYPES.CLEAR_CHATS_SUCCESS]: produce(draftState => {
    draftState.isFetching = false;
    draftState.messages = [];
    draftState.messagesPreview = [];
    draftState.currentDialog = null;
  }),
  [ACTION_TYPES.CLEAR_CURRENT_CHAT]: produce(draftState => {
    draftState.currentDialog = null;
  }),
  [ACTION_TYPES.SET_IS_TYPING]: produce((draftState, action) => {
    const {
      payload: { status, conversationId, userId },
    } = action;
    if (conversationId) {
      draftState.messagesPreview.forEach(conversation =>
        conversation._id === conversationId
          ? (conversation.isTyping = status)
          : null
      );
    }
    if (userId) {
      draftState.messagesPreview.forEach(conversation =>
        conversation.interlocutor.id === userId
          ? (conversation.isTyping = status)
          : null
      );
    }
    if (conversationId === undefined && userId === undefined) {
      draftState.messagesPreview.forEach(
        conversation => (conversation.isTyping = status)
      );
    }
  }),
  [ACTION_TYPES.CREATE_MESSAGE_ERROR]: handleError,
  [ACTION_TYPES.GET_MESSAGES_ERROR]: handleError,
  [ACTION_TYPES.GET_CHATS_ERROR]: handleError,
};

const chatReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export default chatReducer;
