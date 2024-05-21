import produce from 'immer';
import { isEqual } from 'lodash';
import ACTION_TYPES from '../actions/type';

const initialState = {
  isFetching: false,
  isMessagesFetching: false,
  isChatsFetching: false,
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
  replyMessageMode: { isReply: false, message: {} },
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
    payload: { conversationId, interlocutorId, userName, avatar },
  } = action;
  draftState.isFetching = false;
  if (
    // draftState.currentDialog?.conversationId !== conversationId &&
    draftState.currentDialog?.interlocutorId !== interlocutorId &&
    draftState.currentDialog?.userName !== userName
  ) {
    draftState.messages = [];
    draftState.offset = 0;
    draftState.haveMore = true;
    draftState.currentDialog = {
      conversationId,
      interlocutorId,
      userName,
      avatar,
    };
  }
});

const handlers = {
  [ACTION_TYPES.CREATE_MESSAGE_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_MESSAGES_REQUEST]: produce(draftState => {
    draftState.isMessagesFetching = true;
  }),
  [ACTION_TYPES.GET_CHATS_REQUEST]: produce(draftState => {
    draftState.isChatsFetching = true;
  }),
  [ACTION_TYPES.SET_SEEN_MESSAGE_REQUEST]: handleRequests,
  [ACTION_TYPES.START_DIALOG_REQUEST]: handleRequests,
  [ACTION_TYPES.EDIT_MESSAGE_REQUEST]: handleRequests,
  [ACTION_TYPES.DELETE_MESSAGE_REQUEST]: handleRequests,
  [ACTION_TYPES.REPLY_MESSAGE_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_CHATS_ON_RECONNECT_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_MESSAGES_ON_RECONNECT_REQUEST]: handleRequests,
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
    if (
      draftState.messagesPreview.find(
        conversation => conversation._id === preview._id
      )
    ) {
      draftState.messagesPreview.forEach(conversation => {
        if (conversation._id === preview._id) {
          conversation.messageId = preview.messageId;
          conversation.body = preview.body;
          conversation.sender = preview.sender;
          conversation.createdAt = preview.createdAt;
          conversation.isRead = preview.isRead;
          conversation.isTyping = preview.isTyping;
        }
      });
    } else {
      draftState.messagesPreview.push(preview);
    }
  }),
  [ACTION_TYPES.GET_MESSAGES_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { messages, haveMore },
    } = action;
    draftState.isMessagesFetching = false;
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
    draftState.isChatsFetching = false;
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
    draftState.isFetching = false;
    draftState.messages.forEach(message =>
      message._id === id ? (message.isRead = status) : null
    );
    if (draftState.currentDialog?.conversationId === conversationId) {
      draftState.messages.forEach(message => {
        if (message.repliedMessage && message.repliedMessage._id === id) {
          message.repliedMessage.isRead = status;
        }
      });
    }
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
    draftState.isFetching = false;
    if (draftState.currentDialog?.conversationId === conversationId) {
      draftState.messages.forEach(message =>
        message._id === id
          ? ((message.isEdited = isEdited), (message.body = body))
          : null
      );
    }
    if (
      draftState.currentDialog?.conversationId === conversationId &&
      draftState.messages.length > 0
    ) {
      draftState.messages.forEach(message => {
        if (message.repliedMessage && message.repliedMessage._id === id) {
          message.repliedMessage.body = body;
          message.repliedMessage.isEdited = isEdited;
        }
      });
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
    draftState.isFetching = false;
    draftState.offset -= 1;
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
          preview.messageId = prevMessage._id;
          preview.sender = prevMessage.sender;
          preview.body = prevMessage.body;
          preview.createdAt = prevMessage.createdAt;
          preview.isRead = prevMessage.isRead;
        }
      });
    }
    if (
      currentDialog?.conversationId === conversationId &&
      messages.length > 0
    ) {
      messages.forEach(message => {
        if (message.repliedMessage && message.repliedMessage._id === id) {
          message.repliedMessage = { _id: id };
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
  [ACTION_TYPES.SET_REPLY_MESSAGE_MODE]: produce((draftState, action) => {
    const { data } = action.payload;
    draftState.replyMessageMode = data;
  }),
  [ACTION_TYPES.REPLY_MESSAGE_SUCCESS]: produce((draftState, action) => {
    const {
      data: { interlocutorId, conversationId, message },
    } = action.payload;
    draftState.isFetching = false;
    draftState.offset += 1;
    if (draftState.currentDialog?.conversationId === conversationId) {
      draftState.messages.push(message);
    }
    if (
      message.sender === interlocutorId &&
      draftState.unreadMessages.length === 0
    ) {
      draftState.unreadMessages.push({ _id: conversationId, count: 1 });
    } else {
      draftState.unreadMessages.forEach(conversation =>
        conversation._id === conversationId ? (conversation.count += 1) : null
      );
    }
    draftState.messagesPreview.forEach(conversation => {
      if (conversation._id === conversationId) {
        conversation.messageId = message._id;
        conversation.body = message.body;
        conversation.sender = message.sender;
        conversation.createdAt = message.createdAt;
        conversation.isRead = message.isRead;
        conversation.isTyping = false;
      }
    });
  }),
  [ACTION_TYPES.GET_CHATS_ON_RECONNECT_SUCCESS]: produce(
    (draftState, action) => {
      const {
        data: { conversations, unreadMessages },
      } = action.payload;
      draftState.isFetching = false;
      draftState.messagesPreview = conversations;
      draftState.unreadMessages = unreadMessages;
    }
  ),
  [ACTION_TYPES.GET_MESSAGES_ON_RECONNECT_SUCCESS]: produce(
    (draftState, action) => {
      const {
        data: { messages },
      } = action.payload;
      draftState.isFetching = false;
      draftState.offset += messages.length;
      if (messages.length > 0) {
        draftState.messages.push(...messages.reverse());
      }
    }
  ),
  [ACTION_TYPES.CREATE_MESSAGE_ERROR]: handleError,
  [ACTION_TYPES.GET_MESSAGES_ERROR]: handleError,
  [ACTION_TYPES.GET_CHATS_ERROR]: handleError,
  [ACTION_TYPES.START_DIALOG_ERROR]: handleError,
  [ACTION_TYPES.SET_CONTEXT_MENU_TARGET_ERROR]: handleError,
  [ACTION_TYPES.EDIT_MESSAGE_ERROR]: handleError,
  [ACTION_TYPES.DELETE_MESSAGE_ERROR]: handleError,
  [ACTION_TYPES.REPLY_MESSAGE_ERROR]: handleError,
  [ACTION_TYPES.GET_CHATS_ON_RECONNECT_ERROR]: handleError,
  [ACTION_TYPES.GET_MESSAGES_ON_RECONNECT_ERROR]: handleError,
};

const chatReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export default chatReducer;
