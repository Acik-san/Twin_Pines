import produce from 'immer';
import { isEqual } from 'lodash';
import ACTION_TYPES from '../actions/type';

const initialState = {
  isFetching: false,
  error: null,
  limit: 50,
  offset: 0,
  haveMore: true,
  messages: [],
  messagesPreview: [],
  unreadMessages: [],
  currentDialog: null,
  contextMenuTarget: null,
  editMessageMode: { isEdit: false, message: {} },
  deleteMessageMode: { isDelete: false, message: {} },
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

const handleCurrentChat = produce((draftState, action) => {
  const {
    payload: { conversationId, interlocutorId, login, avatar },
  } = action;
  draftState.isFetching = false;
  if (
    // draftState.currentDialog?.conversationId !== conversationId &&
    draftState.currentDialog?.interlocutorId !== interlocutorId &&
    draftState.currentDialog?.login !== login
  ) {
    draftState.messages = [];
    draftState.offset = 0;
    draftState.haveMore = true;
    draftState.currentDialog = {
      conversationId,
      interlocutorId,
      login,
      avatar,
    };
  }
});

const handlers = {
  [ACTION_TYPES.CREATE_MESSAGE_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_MESSAGES_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_CHATS_REQUEST]: handleRequests,
  [ACTION_TYPES.SET_SEEN_MESSAGE_REQUEST]: handleRequests,
  [ACTION_TYPES.START_DIALOG_REQUEST]: handleRequests,
  [ACTION_TYPES.EDIT_MESSAGE_REQUEST]: handleRequests,
  [ACTION_TYPES.DELETE_MESSAGE_REQUEST]: handleRequests,
  [ACTION_TYPES.CREATE_MESSAGE_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { message, preview },
    } = action;
    draftState.isFetching = false;
    draftState.offset += 1;
    if (draftState.currentDialog?.interlocutorId === preview.interlocutor.id) {
      draftState.messages.push(message);
    }
    if (
      preview.sender === preview.interlocutor.id &&
      draftState.unreadMessages.length === 0
    ) {
      draftState.unreadMessages.push({ _id: preview._id, count: 1 });
    } else {
      draftState.unreadMessages.forEach(conversation =>
        conversation._id === preview._id ? (conversation.count += 1) : null
      );
    }
    let isNew = true;
    draftState.messagesPreview.forEach(conversation => {
      if (isEqual(conversation.participants, message.participants)) {
        conversation.messageId = message._id;
        conversation.body = message.body;
        conversation.sender = message.sender;
        conversation.createdAt = message.createdAt;
        conversation.interlocutor.status = preview.interlocutor.status;
        conversation.isRead = false;
        isNew = false;
      }
    });
    if (isNew) {
      draftState.messagesPreview.push(preview);
    }
  }),
  [ACTION_TYPES.GET_MESSAGES_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { messages, haveMore },
    } = action;
    draftState.isFetching = false;
    draftState.offset += messages.length;
    draftState.haveMore = haveMore;
    if (messages.length > 0) {
      draftState.messages = [...messages.reverse(), ...draftState.messages];
    }
  }),
  [ACTION_TYPES.GET_CHATS_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { conversations, unreadMessages },
    } = action;
    draftState.isFetching = false;
    draftState.messagesPreview.push(...conversations);
    draftState.unreadMessages.push(...unreadMessages);
  }),
  [ACTION_TYPES.CHOOSE_CURRENT_CHAT]: handleCurrentChat,
  [ACTION_TYPES.CLEAR_CHATS_SUCCESS]: produce(draftState => {
    draftState.isFetching = false;
    draftState.offset = 0;
    draftState.haveMore = true;
    draftState.messages = [];
    draftState.messagesPreview = [];
    draftState.unreadMessages = [];
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
  [ACTION_TYPES.SET_SEEN_MESSAGE_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { id, conversationId, status },
    } = action;
    draftState.messages.forEach(message =>
      message._id === id ? (message.isRead = status) : null
    );
    // if (sender) {
    draftState.messagesPreview.forEach(preview =>
      preview._id === conversationId && preview.messageId === id
        ? (preview.isRead = status)
        : null
    );
    draftState.unreadMessages = draftState.unreadMessages
      .map(conversation => {
        if (conversation._id === conversationId) {
          conversation.count -= 1;
        }
        return conversation;
      })
      .filter(({ count }) => count !== 0);
    // }
  }),
  [ACTION_TYPES.START_DIALOG_SUCCESS]: handleCurrentChat,
  [ACTION_TYPES.SET_CONTEXT_MENU_TARGET]: produce((draftState, action) => {
    const { data } = action.payload;
    draftState.contextMenuTarget = data;
  }),
  [ACTION_TYPES.SET_EDIT_MESSAGE_MODE]: produce((draftState, action) => {
    const { data } = action.payload;
    draftState.editMessageMode = data;
  }),
  [ACTION_TYPES.EDIT_MESSAGE_SUCCESS]: produce((draftState, action) => {
    const {
      payload: {
        data: { id, conversationId, isEdited, body },
      },
    } = action;
    if (draftState.currentDialog?.conversationId === conversationId) {
      draftState.messages.forEach(message =>
        message._id === id
          ? ((message.isEdited = isEdited), (message.body = body))
          : null
      );
    }
    draftState.messagesPreview.forEach(preview =>
      preview._id === conversationId && preview.messageId === id
        ? (preview.body = body)
        : null
    );
  }),
  [ACTION_TYPES.SET_DELETE_MESSAGE_MODE]: produce((draftState, action) => {
    const { data } = action.payload;
    draftState.deleteMessageMode = data;
  }),
  [ACTION_TYPES.DELETE_MESSAGE_SUCCESS]: produce((draftState, action) => {
    const {
      payload: {
        data: { id, conversationId, prevMessage, numberOfMessages, isRead },
      },
    } = action;
    const { currentDialog, messages, messagesPreview, unreadMessages } =
      draftState;
    const messageIndex = messages.findIndex(message => message._id === id);
  
    if (!isRead) {
      draftState.unreadMessages = unreadMessages
        .map(conversation => {
          if (conversation._id === conversationId) {
            conversation.count -= 1;
          }
          return conversation;
        })
        .filter(({ count }) => count !== 0);
    }

    if (prevMessage) {
      messagesPreview.forEach(preview => {
        if (preview._id === conversationId && preview.messageId === id) {
          preview.messageId = prevMessage.messageId;
          preview.sender = prevMessage.sender;
          preview.body = prevMessage.body;
          preview.createdAt = prevMessage.createdAt;
          preview.isRead = prevMessage.isRead;
        }
      });
    }

    if (
      (prevMessage === undefined || prevMessage === null) &&
      numberOfMessages === 1
    ) {
      draftState.messagesPreview = messagesPreview.filter(
        preview => preview._id !== conversationId && preview.messageId !== id
      );
    }

    if (currentDialog?.conversationId === conversationId) {
      messages.splice(messageIndex, 1);
    }
  }),
  [ACTION_TYPES.CREATE_MESSAGE_ERROR]: handleError,
  [ACTION_TYPES.GET_MESSAGES_ERROR]: handleError,
  [ACTION_TYPES.GET_CHATS_ERROR]: handleError,
  [ACTION_TYPES.START_DIALOG_ERROR]: handleError,
  [ACTION_TYPES.SET_CONTEXT_MENU_TARGET_ERROR]: handleError,
  [ACTION_TYPES.EDIT_MESSAGE_ERROR]: handleError,
  [ACTION_TYPES.DELETE_MESSAGE_ERROR]: handleError,
};

const chatReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export default chatReducer;
