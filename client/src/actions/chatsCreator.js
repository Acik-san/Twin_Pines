import ACTION_TYPES from './type';

export const createMessageRequest = ({
  userId,
  interlocutor,
  conversations,
  messageBody,
}) => ({
  type: ACTION_TYPES.CREATE_MESSAGE_REQUEST,
  payload: { userId, interlocutor, conversations, messageBody },
});
export const createMessageSuccess = ({ message, preview }) => ({
  type: ACTION_TYPES.CREATE_MESSAGE_SUCCESS,
  payload: { message, preview },
});
export const createMessageError = error => ({
  type: ACTION_TYPES.CREATE_MESSAGE_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const getMessagesRequest = id => ({
  type: ACTION_TYPES.GET_MESSAGES_REQUEST,
  payload: { id },
});
export const getMessagesSuccess = messages => ({
  type: ACTION_TYPES.GET_MESSAGES_SUCCESS,
  payload: { messages },
});
export const getMessagesError = error => ({
  type: ACTION_TYPES.GET_MESSAGES_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const getChatsRequest = () => ({
  type: ACTION_TYPES.GET_CHATS_REQUEST,
  payload: {},
});
export const getChatsSuccess = conversations => ({
  type: ACTION_TYPES.GET_CHATS_SUCCESS,
  payload: { conversations },
});
export const getChatsError = error => ({
  type: ACTION_TYPES.GET_CHATS_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const chooseCurrentChat = ({
  conversationId,
  interlocutorId,
  login,
  avatar,
}) => ({
  type: ACTION_TYPES.CHOOSE_CURRENT_CHAT,
  payload: { conversationId, interlocutorId, login, avatar },
});
//---------------------------------------
//---------------------------------------
export const clearChatsSuccess = () => ({
  type: ACTION_TYPES.CLEAR_CHATS_SUCCESS,
  payload: {},
});
export const clearCurrentChat = () => ({
  type: ACTION_TYPES.CLEAR_CURRENT_CHAT,
  payload: {},
});
//---------------------------------------
//---------------------------------------
export const startTypingRequest = conversationId => ({
  type: ACTION_TYPES.START_TYPING_REQUEST,
  payload: { conversationId },
});
export const startTypingError = error => ({
  type: ACTION_TYPES.START_TYPING_ERROR,
  payload: { error },
});
export const stopTypingRequest = (conversationId, timerId) => ({
  type: ACTION_TYPES.STOP_TYPING_REQUEST,
  payload: { conversationId, timerId },
});
export const stopTypingError = error => ({
  type: ACTION_TYPES.STOP_TYPING_ERROR,
  payload: { error },
});
export const setTypingStatus = ({ status, conversationId, userId }) => ({
  type: ACTION_TYPES.SET_IS_TYPING,
  payload: { status, conversationId, userId },
});
//---------------------------------------
//---------------------------------------
export const subscribeChatsRequest = ({ userId, conversations }) => ({
  type: ACTION_TYPES.SUBSCRIBE_CHATS_REQUEST,
  payload: { userId, conversations },
});
export const subscribeChatsError = error => ({
  type: ACTION_TYPES.SUBSCRIBE_CHATS_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
// export const getOnlineUsers = users => ({
//   type: ACTION_TYPES.GET_ONLINE_USERS,
//   payload: { users },
// });
