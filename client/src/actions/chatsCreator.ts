import {
  IContextMenuTarget,
  IDeletedMessageData,
  IDeleteMessageMode,
  IEditMessageMode,
  IError,
  IForwardedFrom,
  IForwardMessageMode,
  IMessage,
  IMessagePreview,
  IReplyMessageMode,
} from '../types';
import {
  ChooseCurrentChatAction,
  ClearChatsSuccessAction,
  ClearCurrentChatAction,
  CreateMessageErrorAction,
  CreateMessageRequestAction,
  CreateMessageSuccessAction,
  DeleteMessageErrorAction,
  DeleteMessageRequestAction,
  DeleteMessageSuccessAction,
  EditMessageErrorAction,
  EditMessageRequestAction,
  EditMessageSuccessAction,
  ForwardMessageErrorAction,
  ForwardMessageRequestAction,
  ForwardMessageSuccessAction,
  GetChatsErrorAction,
  GetChatsOnReconnectErrorAction,
  GetChatsOnReconnectRequestAction,
  GetChatsOnReconnectSuccessAction,
  GetChatsRequestAction,
  GetChatsSuccessAction,
  GetMessagesErrorAction,
  GetMessagesOnReconnectErrorAction,
  GetMessagesOnReconnectRequestAction,
  GetMessagesOnReconnectSuccessAction,
  GetMessagesRequestAction,
  GetMessagesSuccessAction,
  ReplyMessageErrorAction,
  ReplyMessageRequestAction,
  ReplyMessageSuccessAction,
  SetChatInfoOpenAction,
  SetContextMenuTargetAction,
  SetContextMenuTargetErrorAction,
  SetDeleteMessageModeAction,
  SetEditMessageModeAction,
  SetForwardMessageModeAction,
  SetReplyMessageModeAction,
  SetSeenMessageErrorAction,
  SetSeenMessageRequestAction,
  SetSeenMessageSuccessAction,
  SetTypingStatusAction,
  StartDialogErrorAction,
  StartDialogRequestAction,
  StartDialogSuccessAction,
  StartTypingErrorAction,
  StartTypingRequestAction,
  StopTypingErrorAction,
  StopTypingRequestAction,
  SubscribeChatsErrorAction,
  SubscribeChatsRequestAction,
} from '../types/chatActionTypes';
import ACTION_TYPES from './type';

export const createMessageRequest = ({
  userId,
  interlocutor,
  conversations,
  messageBody,
}: {
  userId: number;
  interlocutor: number;
  conversations: string[];
  messageBody: string;
}): CreateMessageRequestAction => ({
  type: ACTION_TYPES.CREATE_MESSAGE_REQUEST,
  payload: { userId, interlocutor, conversations, messageBody },
});
export const createMessageSuccess = ({
  message,
  preview,
}: {
  message: IMessage;
  preview: IMessagePreview;
}): CreateMessageSuccessAction => ({
  type: ACTION_TYPES.CREATE_MESSAGE_SUCCESS,
  payload: { message, preview },
});
export const createMessageError = (
  error: IError
): CreateMessageErrorAction => ({
  type: ACTION_TYPES.CREATE_MESSAGE_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const getMessagesRequest = ({
  id,
  limit,
  offset,
}: {
  id: number;
  limit: number;
  offset: number;
}): GetMessagesRequestAction => ({
  type: ACTION_TYPES.GET_MESSAGES_REQUEST,
  payload: { id, limit, offset },
});
export const getMessagesSuccess = ({
  messages,
  haveMore,
}: {
  messages: IMessage[];
  haveMore: boolean;
}): GetMessagesSuccessAction => ({
  type: ACTION_TYPES.GET_MESSAGES_SUCCESS,
  payload: { messages, haveMore },
});
export const getMessagesError = (error: IError): GetMessagesErrorAction => ({
  type: ACTION_TYPES.GET_MESSAGES_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const getChatsRequest = (): GetChatsRequestAction => ({
  type: ACTION_TYPES.GET_CHATS_REQUEST,
  payload: {},
});
export const getChatsSuccess = ({
  conversations,
  unreadMessages,
}: {
  conversations: IMessagePreview[] | [];
  unreadMessages: { _id: string; count: number }[] | [];
}): GetChatsSuccessAction => ({
  type: ACTION_TYPES.GET_CHATS_SUCCESS,
  payload: { conversations, unreadMessages },
});
export const getChatsError = (error: IError): GetChatsErrorAction => ({
  type: ACTION_TYPES.GET_CHATS_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const chooseCurrentChat = ({
  conversationId,
  interlocutorId,
  userName,
  avatar,
  onlineStatus,
  lastSeen,
}: {
  conversationId: string;
  interlocutorId: number;
  userName: string;
  avatar: string;
  onlineStatus?: string;
  lastSeen?: string;
}): ChooseCurrentChatAction => ({
  type: ACTION_TYPES.CHOOSE_CURRENT_CHAT,
  payload: {
    conversationId,
    interlocutorId,
    userName,
    avatar,
    onlineStatus,
    lastSeen,
  },
});
//---------------------------------------
//---------------------------------------
export const startDialogRequest = ({
  userId,
  interlocutorId,
  userName,
  avatar,
}: {
  userId: number;
  interlocutorId: number;
  userName: string;
  avatar: string;
}): StartDialogRequestAction => ({
  type: ACTION_TYPES.START_DIALOG_REQUEST,
  payload: { userId, interlocutorId, userName, avatar },
});
export const startDialogSuccess = ({
  conversationId,
  interlocutorId,
  userName,
  avatar,
}: {
  conversationId: string;
  interlocutorId: number;
  userName: string;
  avatar: string;
}): StartDialogSuccessAction => ({
  type: ACTION_TYPES.START_DIALOG_SUCCESS,
  payload: { conversationId, interlocutorId, userName, avatar },
});
export const startDialogError = (error: IError): StartDialogErrorAction => ({
  type: ACTION_TYPES.START_DIALOG_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const clearChatsSuccess = (): ClearChatsSuccessAction => ({
  type: ACTION_TYPES.CLEAR_CHATS_SUCCESS,
  payload: {},
});
export const clearCurrentChat = (): ClearCurrentChatAction => ({
  type: ACTION_TYPES.CLEAR_CURRENT_CHAT,
  payload: {},
});
//---------------------------------------
//---------------------------------------
export const startTypingRequest = (
  conversationId: string
): StartTypingRequestAction => ({
  type: ACTION_TYPES.START_TYPING_REQUEST,
  payload: { conversationId },
});
export const startTypingError = (error: IError): StartTypingErrorAction => ({
  type: ACTION_TYPES.START_TYPING_ERROR,
  payload: { error },
});
export const stopTypingRequest = (
  conversationId: string
): StopTypingRequestAction => ({
  type: ACTION_TYPES.STOP_TYPING_REQUEST,
  payload: { conversationId },
});
export const stopTypingError = (error: IError): StopTypingErrorAction => ({
  type: ACTION_TYPES.STOP_TYPING_ERROR,
  payload: { error },
});
export const setTypingStatus = ({
  status,
  conversationId,
  userId,
}: {
  status: boolean;
  conversationId?: string;
  userId?: number;
}): SetTypingStatusAction => ({
  type: ACTION_TYPES.SET_IS_TYPING,
  payload: { status, conversationId, userId },
});
//---------------------------------------
//---------------------------------------
export const subscribeChatsRequest = ({
  userId,
  conversations,
}: {
  userId: number;
  conversations: { conversationId: string; interlocutorId: number }[];
}): SubscribeChatsRequestAction => ({
  type: ACTION_TYPES.SUBSCRIBE_CHATS_REQUEST,
  payload: { userId, conversations },
});
export const subscribeChatsError = (
  error: IError
): SubscribeChatsErrorAction => ({
  type: ACTION_TYPES.SUBSCRIBE_CHATS_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const setSeenMessageRequest = (
  messageId: string
): SetSeenMessageRequestAction => ({
  type: ACTION_TYPES.SET_SEEN_MESSAGE_REQUEST,
  payload: { messageId },
});
export const setSeenMessageSuccess = ({
  id,
  conversationId,
  status,
}: {
  id: string;
  conversationId: string;
  status: boolean;
}): SetSeenMessageSuccessAction => ({
  type: ACTION_TYPES.SET_SEEN_MESSAGE_SUCCESS,
  payload: { id, conversationId, status },
});
export const setSeenMessageError = (
  error: IError
): SetSeenMessageErrorAction => ({
  type: ACTION_TYPES.SET_SEEN_MESSAGE_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const setContextMenuTarget = (
  data: IContextMenuTarget | null
): SetContextMenuTargetAction => ({
  type: ACTION_TYPES.SET_CONTEXT_MENU_TARGET,
  payload: { data },
});
export const setContextMenuTargetError = (
  error: IError
): SetContextMenuTargetErrorAction => ({
  type: ACTION_TYPES.SET_CONTEXT_MENU_TARGET_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const setEditMessageMode = (
  data: IEditMessageMode
): SetEditMessageModeAction => ({
  type: ACTION_TYPES.SET_EDIT_MESSAGE_MODE,
  payload: { data },
});
//---------------------------------------
//---------------------------------------
export const editMessageRequest = (data: {
  messageId: string;
  conversationId: string;
  editedBody: string;
}): EditMessageRequestAction => ({
  type: ACTION_TYPES.EDIT_MESSAGE_REQUEST,
  payload: { data },
});
export const editMessageSuccess = (data: {
  id: string;
  conversationId: string;
  body: string;
  isEdited: boolean;
}): EditMessageSuccessAction => ({
  type: ACTION_TYPES.EDIT_MESSAGE_SUCCESS,
  payload: { data },
});
export const editMessageError = (error: IError): EditMessageErrorAction => ({
  type: ACTION_TYPES.EDIT_MESSAGE_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const setDeleteMessageMode = (
  data: IDeleteMessageMode
): SetDeleteMessageModeAction => ({
  type: ACTION_TYPES.SET_DELETE_MESSAGE_MODE,
  payload: { data },
});
//---------------------------------------
//---------------------------------------
export const deleteMessageRequest = (
  data: IDeletedMessageData
): DeleteMessageRequestAction => ({
  type: ACTION_TYPES.DELETE_MESSAGE_REQUEST,
  payload: { data },
});
export const deleteMessageSuccess = (
  data: IDeletedMessageData
): DeleteMessageSuccessAction => ({
  type: ACTION_TYPES.DELETE_MESSAGE_SUCCESS,
  payload: { data },
});
export const deleteMessageError = (
  error: IError
): DeleteMessageErrorAction => ({
  type: ACTION_TYPES.DELETE_MESSAGE_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const setReplyMessageMode = (
  data: IReplyMessageMode
): SetReplyMessageModeAction => ({
  type: ACTION_TYPES.SET_REPLY_MESSAGE_MODE,
  payload: { data },
});
//---------------------------------------
//---------------------------------------
export const replyMessageRequest = (data: {
  userId: number;
  interlocutorId: number;
  messageId: string;
  conversationId: string;
  body: string;
  forwardedFrom?: IForwardedFrom;
}): ReplyMessageRequestAction => ({
  type: ACTION_TYPES.REPLY_MESSAGE_REQUEST,
  payload: { data },
});
export const replyMessageSuccess = (data: {
  interlocutorId: number;
  conversationId: string;
  message: IMessage;
}): ReplyMessageSuccessAction => ({
  type: ACTION_TYPES.REPLY_MESSAGE_SUCCESS,
  payload: { data },
});
export const replyMessageError = (error: IError): ReplyMessageErrorAction => ({
  type: ACTION_TYPES.REPLY_MESSAGE_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const setForwardMessageMode = (
  data: IForwardMessageMode
): SetForwardMessageModeAction => ({
  type: ACTION_TYPES.SET_FORWARD_MESSAGE_MODE,
  payload: { data },
});
//---------------------------------------
//---------------------------------------
export const forwardMessageRequest = (data: {
  userId: number;
  interlocutorId: number;
  messageId: string;
  conversationId: string;
  body: string;
  forwardedBody: string;
  isForwarded: boolean;
  forwardedFrom?: IForwardedFrom;
}): ForwardMessageRequestAction => ({
  type: ACTION_TYPES.FORWARD_MESSAGE_REQUEST,
  payload: { data },
});
export const forwardMessageSuccess = (data: {
  interlocutorId: number;
  conversationId: string;
  message: IMessage;
  forwardedMessageId: string;
}): ForwardMessageSuccessAction => ({
  type: ACTION_TYPES.FORWARD_MESSAGE_SUCCESS,
  payload: { data },
});
export const forwardMessageError = (
  error: IError
): ForwardMessageErrorAction => ({
  type: ACTION_TYPES.FORWARD_MESSAGE_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const getChatsOnReconnectRequest =
  (): GetChatsOnReconnectRequestAction => ({
    type: ACTION_TYPES.GET_CHATS_ON_RECONNECT_REQUEST,
    payload: {},
  });
export const getChatsOnReconnectSuccess = (data: {
  conversations: IMessagePreview[] | [];
  unreadMessages: { _id: string; count: number }[] | [];
}): GetChatsOnReconnectSuccessAction => ({
  type: ACTION_TYPES.GET_CHATS_ON_RECONNECT_SUCCESS,
  payload: { data },
});
export const getChatsOnReconnectError = (
  error: IError
): GetChatsOnReconnectErrorAction => ({
  type: ACTION_TYPES.GET_CHATS_ON_RECONNECT_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const getMessagesOnReconnectRequest = (data: {
  id: number;
  lastMessageDate: string;
}): GetMessagesOnReconnectRequestAction => ({
  type: ACTION_TYPES.GET_MESSAGES_ON_RECONNECT_REQUEST,
  payload: { data },
});
export const getMessagesOnReconnectSuccess = (data: {
  messages: IMessage[] | [];
}): GetMessagesOnReconnectSuccessAction => ({
  type: ACTION_TYPES.GET_MESSAGES_ON_RECONNECT_SUCCESS,
  payload: { data },
});
export const getMessagesOnReconnectError = (
  error: IError
): GetMessagesOnReconnectErrorAction => ({
  type: ACTION_TYPES.GET_MESSAGES_ON_RECONNECT_ERROR,
  payload: { error },
});
//---------------------------------------
//---------------------------------------
export const setChatInfoOpen = (
  isChatInfoOpen: boolean
): SetChatInfoOpenAction => ({
  type: ACTION_TYPES.SET_CHAT_INFO_OPEN,
  payload: { isChatInfoOpen },
});
