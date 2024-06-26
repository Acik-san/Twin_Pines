import socket from '.';
import { IDeletedMessageData, IForwardedFrom } from '../../types';
import CONSTANTS from '../../constants';

export const createMessage = (data: {
  userId: number;
  interlocutor: number;
  conversations: string[];
  messageBody: string;
}) => socket.emit(CONSTANTS.SOCKET_EVENTS.NEW_MESSAGE, data);

export const setOnlineStatus = (data: { userId: number; status: string }) => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.SET_ONLINE_STATUS, data);
};
export const getOnlineStatus = (data: { userId: number }) => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.GET_ONLINE_STATUS, data);
};
export const getOnlineUsers = () => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.GET_ONLINE_USERS);
};
export const subscribeUserProfile = (data: { userId: number }) => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.SUBSCRIBE_USER_PROFILE, data);
};
export const unsubscribeUserProfile = (data: { userId: number }) =>
  socket.emit(CONSTANTS.SOCKET_EVENTS.UNSUBSCRIBE_USER_PROFILE, data);

export const subscribeChats = (data: {
  userId: number;
  conversations: {
    conversationId: string;
    interlocutorId: number;
  }[];
}) => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.SUBSCRIBE_CHATS, data);
};
export const unsubscribeChats = (data: {
  userId: number;
  conversations: {
    conversationId: string;
    interlocutorId: number;
  }[];
}) => socket.emit(CONSTANTS.SOCKET_EVENTS.UNSUBSCRIBE_CHATS, data);
export const startTyping = (conversationId: string) => {
  if (conversationId !== undefined) {
    socket.emit(CONSTANTS.SOCKET_EVENTS.START_TYPING, conversationId);
  }
};
export const stopTyping = (conversationId: string) => {
  if (conversationId !== undefined) {
    socket.emit(CONSTANTS.SOCKET_EVENTS.STOP_TYPING, conversationId);
  }
};

export const setSeenMessage = (messageId: string) => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.SET_SEEN_MESSAGE, messageId);
};

export const editMessage = (data: {
  messageId: string;
  conversationId: string;
  editedBody: string;
}) => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.EDIT_MESSAGE, data);
};

export const deleteMessage = (data: IDeletedMessageData) => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.DELETE_MESSAGE, data);
};

export const replyMessage = (data: {
  userId: number;
  interlocutorId: number;
  messageId: string;
  conversationId: string;
  body: string;
  forwardedFrom?: IForwardedFrom | undefined;
}) => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.REPLY_MESSAGE, data);
};

export const forwardMessage = (data: {
  userId: number;
  interlocutorId: number;
  messageId: string;
  conversationId: string;
  body: string;
  forwardedBody: string;
  isForwarded: boolean;
  forwardedFrom?: IForwardedFrom | undefined;
}) => {
  socket.emit(CONSTANTS.SOCKET_EVENTS.FORWARD_MESSAGE, data);
};
