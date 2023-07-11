import socket from '.';
import CONSTANTS from '../../constants';

export const createMessage = ({
  userId,
  interlocutor,
  conversations,
  messageBody,
}) =>
  socket.emit(CONSTANTS.SOCKET_EVENTS.NEW_MESSAGE, {
    userId,
    interlocutor,
    conversations,
    messageBody,
  });

export const setOnlineStatus = data => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.SET_ONLINE_STATUS, data);
};
export const getOnlineUsers = () => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.GET_ONLINE_USERS);
};

export const subscribeChats = ({ userId, conversations }) => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.SUBSCRIBE_CHATS, {
    userId,
    conversations,
  });
};
export const unSubscribeChats = ({ userId, conversations }) =>
  socket.emit(CONSTANTS.SOCKET_EVENTS.UNSUBSCRIBE_CHATS, {
    userId,
    conversations,
  });
export const startTyping = conversationId => {
  if (conversationId !== undefined) {
    socket.emit(CONSTANTS.SOCKET_EVENTS.START_TYPING, conversationId);
  }
};
export const stopTyping = (conversationId, timerId) => {
  if (conversationId !== undefined) {
    console.log('stop');
    clearTimeout(timerId);
    socket.emit(CONSTANTS.SOCKET_EVENTS.STOP_TYPING, conversationId);
  }
};
