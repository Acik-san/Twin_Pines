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
export const getChatsSuccess = ({ conversations, unreadMessages }) => ({
  type: ACTION_TYPES.GET_CHATS_SUCCESS,
  payload: { conversations, unreadMessages },
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
export const startDialogRequest = ({
  userId,
  interlocutorId,
  login,
  avatar,
}) => ({
  type: ACTION_TYPES.START_DIALOG_REQUEST,
  payload: { userId, interlocutorId, login, avatar },
});
//---------------------------------------
//---------------------------------------
export const startDialogSuccess = ({
  conversationId,
  interlocutorId,
  login,
  avatar,
}) => ({
  type: ACTION_TYPES.START_DIALOG_SUCCESS,
  payload: { conversationId, interlocutorId, login, avatar },
});
//---------------------------------------
//---------------------------------------
export const startDialogError = error => ({
  type: ACTION_TYPES.START_DIALOG_ERROR,
  payload: { error },
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
export const setContextMenuTarget = data => ({
  type: ACTION_TYPES.SET_CONTEXT_MENU_TARGET,
  payload: { data },
});
export const setContextMenuTargetError = error => ({
  type: ACTION_TYPES.SET_CONTEXT_MENU_TARGET_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const setEditMessageMode = data => ({
  type: ACTION_TYPES.SET_EDIT_MESSAGE_MODE,
  payload: { data },
});
//---------------------------------------
//---------------------------------------
export const editMessageRequest = data => ({
  type: ACTION_TYPES.EDIT_MESSAGE_REQUEST,
  payload: { data },
});
export const editMessageSuccess = data => ({
  type: ACTION_TYPES.EDIT_MESSAGE_SUCCESS,
  payload: { data },
});
export const editMessageError = error => ({
  type: ACTION_TYPES.EDIT_MESSAGE_ERROR,
  payload: { error },
});
