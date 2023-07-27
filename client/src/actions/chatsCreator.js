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
export const getMessagesRequest = ({ id, limit, offset }) => ({
  type: ACTION_TYPES.GET_MESSAGES_REQUEST,
  payload: { id, limit, offset },
});
export const getMessagesSuccess = ({ messages, haveMore }) => ({
  type: ACTION_TYPES.GET_MESSAGES_SUCCESS,
  payload: { messages, haveMore },
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
export const getChatsSuccess = ({conversations,unreadMessages}) => ({
  type: ACTION_TYPES.GET_CHATS_SUCCESS,
  payload: { conversations,unreadMessages },
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
export const stopTypingRequest = conversationId => ({
  type: ACTION_TYPES.STOP_TYPING_REQUEST,
  payload: { conversationId },
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
export const setSeenMessageRequest = messageId => ({
  type: ACTION_TYPES.SET_SEEN_MESSAGE_REQUEST,
  payload: { messageId },
});
export const setSeenMessageSuccess = ({ id, conversationId, status }) => ({
  type: ACTION_TYPES.SET_SEEN_MESSAGE_SUCCESS,
  payload: { id, conversationId, status },
});
export const setSeenMessageError = error => ({
  type: ACTION_TYPES.SET_SEEN_MESSAGE_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------

