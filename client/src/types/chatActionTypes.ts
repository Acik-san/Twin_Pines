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
} from '.';
import ACTION_TYPES from '../actions/type';

export interface CreateMessageRequestAction {
  type: typeof ACTION_TYPES.CREATE_MESSAGE_REQUEST;
  payload: {
    userId: number;
    interlocutor: number;
    conversations: string[];
    messageBody: string;
  };
}
export interface CreateMessageSuccessAction {
  type: typeof ACTION_TYPES.CREATE_MESSAGE_SUCCESS;
  payload: { message: IMessage; preview: IMessagePreview };
}
export interface CreateMessageErrorAction {
  type: typeof ACTION_TYPES.CREATE_MESSAGE_ERROR;
  payload: { error: IError };
}
export interface GetMessagesRequestAction {
  type: typeof ACTION_TYPES.GET_MESSAGES_REQUEST;
  payload: { id: number; limit: number; offset: number };
}
export interface GetMessagesSuccessAction {
  type: typeof ACTION_TYPES.GET_MESSAGES_SUCCESS;
  payload: { messages: IMessage[] | []; haveMore: boolean };
}
export interface GetMessagesErrorAction {
  type: typeof ACTION_TYPES.GET_MESSAGES_ERROR;
  payload: { error: IError };
}
export interface GetChatsRequestAction {
  type: typeof ACTION_TYPES.GET_CHATS_REQUEST;
  payload: {};
}
export interface GetChatsSuccessAction {
  type: typeof ACTION_TYPES.GET_CHATS_SUCCESS;
  payload: {
    conversations: IMessagePreview[] | [];
    unreadMessages: { _id: string; count: number }[] | [];
  };
}
export interface GetChatsErrorAction {
  type: typeof ACTION_TYPES.GET_CHATS_ERROR;
  payload: { error: IError };
}
export interface ChooseCurrentChatAction {
  type: typeof ACTION_TYPES.CHOOSE_CURRENT_CHAT;
  payload: {
    conversationId: string;
    interlocutorId: number;
    userName: string;
    avatar: string;
    onlineStatus?: string;
    lastSeen?: string;
  };
}
export interface StartDialogRequestAction {
  type: typeof ACTION_TYPES.START_DIALOG_REQUEST;
  payload: {
    userId: number;
    interlocutorId: number;
    userName: string;
    avatar: string;
  };
}
export interface StartDialogSuccessAction {
  type: typeof ACTION_TYPES.START_DIALOG_SUCCESS;
  payload: {
    conversationId: string;
    interlocutorId: number;
    userName: string;
    avatar: string;
  };
}
export interface StartDialogErrorAction {
  type: typeof ACTION_TYPES.START_DIALOG_ERROR;
  payload: { error: IError };
}
export interface ClearChatsSuccessAction {
  type: typeof ACTION_TYPES.CLEAR_CHATS_SUCCESS;
  payload: {};
}
export interface ClearCurrentChatAction {
  type: typeof ACTION_TYPES.CLEAR_CURRENT_CHAT;
  payload: {};
}
export interface StartTypingRequestAction {
  type: typeof ACTION_TYPES.START_TYPING_REQUEST;
  payload: { conversationId: string };
}
export interface StartTypingErrorAction {
  type: typeof ACTION_TYPES.START_TYPING_ERROR;
  payload: { error: IError };
}
export interface StopTypingRequestAction {
  type: typeof ACTION_TYPES.STOP_TYPING_REQUEST;
  payload: { conversationId: string };
}
export interface StopTypingErrorAction {
  type: typeof ACTION_TYPES.STOP_TYPING_ERROR;
  payload: { error: IError };
}
export interface SetTypingStatusAction {
  type: typeof ACTION_TYPES.SET_IS_TYPING;
  payload: { status: boolean; conversationId?: string; userId?: number };
}
export interface SubscribeChatsRequestAction {
  type: typeof ACTION_TYPES.SUBSCRIBE_CHATS_REQUEST;
  payload: {
    userId: number;
    conversations: { conversationId: string; interlocutorId: number }[];
  };
}
export interface SubscribeChatsErrorAction {
  type: typeof ACTION_TYPES.SUBSCRIBE_CHATS_ERROR;
  payload: { error: IError };
}
export interface SetSeenMessageRequestAction {
  type: typeof ACTION_TYPES.SET_SEEN_MESSAGE_REQUEST;
  payload: { messageId: string };
}
export interface SetSeenMessageSuccessAction {
  type: typeof ACTION_TYPES.SET_SEEN_MESSAGE_SUCCESS;
  payload: { id: string; conversationId: string; status: boolean };
}
export interface SetSeenMessageErrorAction {
  type: typeof ACTION_TYPES.SET_SEEN_MESSAGE_ERROR;
  payload: { error: IError };
}
export interface SetContextMenuTargetAction {
  type: typeof ACTION_TYPES.SET_CONTEXT_MENU_TARGET;
  payload: { data: IContextMenuTarget | null };
}
export interface SetContextMenuTargetErrorAction {
  type: typeof ACTION_TYPES.SET_CONTEXT_MENU_TARGET_ERROR;
  payload: { error: IError };
}
export interface SetEditMessageModeAction {
  type: typeof ACTION_TYPES.SET_EDIT_MESSAGE_MODE;
  payload: { data: IEditMessageMode };
}
export interface EditMessageRequestAction {
  type: typeof ACTION_TYPES.EDIT_MESSAGE_REQUEST;
  payload: {
    data: { messageId: string; conversationId: string; editedBody: string };
  };
}
export interface EditMessageSuccessAction {
  type: typeof ACTION_TYPES.EDIT_MESSAGE_SUCCESS;
  payload: {
    data: {
      id: string;
      conversationId: string;
      body: string;
      isEdited: boolean;
    };
  };
}
export interface EditMessageErrorAction {
  type: typeof ACTION_TYPES.EDIT_MESSAGE_ERROR;
  payload: { error: IError };
}
export interface SetDeleteMessageModeAction {
  type: typeof ACTION_TYPES.SET_DELETE_MESSAGE_MODE;
  payload: { data: IDeleteMessageMode };
}
export interface DeleteMessageRequestAction {
  type: typeof ACTION_TYPES.DELETE_MESSAGE_REQUEST;
  payload: {
    data: IDeletedMessageData;
  };
}
export interface DeleteMessageSuccessAction {
  type: typeof ACTION_TYPES.DELETE_MESSAGE_SUCCESS;
  payload: {
    data: IDeletedMessageData;
  };
}
export interface DeleteMessageErrorAction {
  type: typeof ACTION_TYPES.DELETE_MESSAGE_ERROR;
  payload: { error: IError };
}
export interface SetReplyMessageModeAction {
  type: typeof ACTION_TYPES.SET_REPLY_MESSAGE_MODE;
  payload: { data: IReplyMessageMode };
}
export interface ReplyMessageRequestAction {
  type: typeof ACTION_TYPES.REPLY_MESSAGE_REQUEST;
  payload: {
    data: {
      userId: number;
      interlocutorId: number;
      messageId: string;
      conversationId: string;
      body: string;
      forwardedFrom?: IForwardedFrom;
    };
  };
}
export interface ReplyMessageSuccessAction {
  type: typeof ACTION_TYPES.REPLY_MESSAGE_SUCCESS;
  payload: {
    data: {
      interlocutorId: number;
      conversationId: string;
      message: IMessage;
    };
  };
}
export interface ReplyMessageErrorAction {
  type: typeof ACTION_TYPES.REPLY_MESSAGE_ERROR;
  payload: { error: IError };
}
export interface SetForwardMessageModeAction {
  type: typeof ACTION_TYPES.SET_FORWARD_MESSAGE_MODE;
  payload: { data: IForwardMessageMode };
}
export interface ForwardMessageRequestAction {
  type: typeof ACTION_TYPES.FORWARD_MESSAGE_REQUEST;
  payload: {
    data: {
      userId: number;
      interlocutorId: number;
      messageId: string;
      conversationId: string;
      body: string;
      forwardedBody: string;
      isForwarded: boolean;
      forwardedFrom?: IForwardedFrom;
    };
  };
}
export interface ForwardMessageSuccessAction {
  type: typeof ACTION_TYPES.FORWARD_MESSAGE_SUCCESS;
  payload: {
    data: {
      interlocutorId: number;
      conversationId: string;
      message: IMessage;
      forwardedMessageId: string;
    };
  };
}
export interface ForwardMessageErrorAction {
  type: typeof ACTION_TYPES.FORWARD_MESSAGE_ERROR;
  payload: { error: IError };
}
export interface GetChatsOnReconnectRequestAction {
  type: typeof ACTION_TYPES.GET_CHATS_ON_RECONNECT_REQUEST;
  payload: {};
}
export interface GetChatsOnReconnectSuccessAction {
  type: typeof ACTION_TYPES.GET_CHATS_ON_RECONNECT_SUCCESS;
  payload: {
    data: {
      conversations: IMessagePreview[] | [];
      unreadMessages: { _id: string; count: number }[] | [];
    };
  };
}
export interface GetChatsOnReconnectErrorAction {
  type: typeof ACTION_TYPES.GET_CHATS_ON_RECONNECT_ERROR;
  payload: { error: IError };
}
export interface GetMessagesOnReconnectRequestAction {
  type: typeof ACTION_TYPES.GET_MESSAGES_ON_RECONNECT_REQUEST;
  payload: { data: { id: number; lastMessageDate: string } };
}
export interface GetMessagesOnReconnectSuccessAction {
  type: typeof ACTION_TYPES.GET_MESSAGES_ON_RECONNECT_SUCCESS;
  payload: { data: { messages: IMessage[] | [] } };
}
export interface GetMessagesOnReconnectErrorAction {
  type: typeof ACTION_TYPES.GET_MESSAGES_ON_RECONNECT_ERROR;
  payload: { error: IError };
}
export interface SetChatInfoOpenAction {
  type: typeof ACTION_TYPES.SET_CHAT_INFO_OPEN;
  payload: { isChatInfoOpen: boolean };
}
