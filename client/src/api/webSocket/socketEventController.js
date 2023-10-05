import socket from '.';
import CONSTANTS from '../../constants';

export const createMessage = data =>
  socket.emit(CONSTANTS.SOCKET_EVENTS.NEW_MESSAGE, data);

export const setOnlineStatus = data => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.SET_ONLINE_STATUS, data);
};
export const getOnlineUsers = () => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.GET_ONLINE_USERS);
};

export const subscribeChats = data => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.SUBSCRIBE_CHATS, data);
};
export const unSubscribeChats = data =>
  socket.emit(CONSTANTS.SOCKET_EVENTS.UNSUBSCRIBE_CHATS, data);
export const startTyping = conversationId => {
  if (conversationId !== undefined) {
    socket.emit(CONSTANTS.SOCKET_EVENTS.START_TYPING, conversationId);
  }
};
export const stopTyping = conversationId => {
  if (conversationId !== undefined) {
    socket.emit(CONSTANTS.SOCKET_EVENTS.STOP_TYPING, conversationId);
  }
};

export const setSeenMessage = messageId => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.SET_SEEN_MESSAGE, messageId);
};

export const editMessage = data => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.EDIT_MESSAGE, data);
};

export const deleteMessage = data => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.DELETE_MESSAGE, data);
};
