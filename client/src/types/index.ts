import React, { RefObject, SyntheticEvent } from 'react';
import {
  LogoutErrorAction,
  LogoutSuccessAction,
  RefreshErrorAction,
  RefreshRequestAction,
  RefreshSuccessAction,
  SignInErrorAction,
  SignInRequestAction,
  SignInSuccessAction,
  SignUpErrorAction,
  SignUpRequestAction,
  SignUpSuccessAction,
} from './authActionTypes';
import {
  CleanProfileSubscriptionsAction,
  CleanUserProfileAction,
  GetAuthUserErrorAction,
  GetAuthUserRequestAction,
  GetAuthUserSuccessAction,
  GetOnlineStatusAction,
  GetOnlineStatusErrorAction,
  GetOnlineStatusRequestAction,
  GetOnlineUsersAction,
  GetOnlineUsersErrorAction,
  GetOnlineUsersRequestAction,
  GetUserErrorAction,
  GetUserFollowersErrorAction,
  GetUserFollowersRequestAction,
  GetUserFollowersSuccessAction,
  GetUserFollowingErrorAction,
  GetUserFollowingRequestAction,
  GetUserFollowingSuccessAction,
  GetUserRequestAction,
  GetUsersErrorAction,
  GetUsersRequestAction,
  GetUsersSuccessAction,
  GetUserSuccessAction,
  SetOnlineStatusAction,
  SetOnlineStatusErrorAction,
  SetOnlineStatusRequestAction,
  SubscribeUserErrorAction,
  SubscribeUserProfileErrorAction,
  SubscribeUserProfileRequestAction,
  SubscribeUserRequestAction,
  SubscribeUserSuccessAction,
  UnsubscribeUserErrorAction,
  UnsubscribeUserProfileErrorAction,
  UnsubscribeUserProfileRequestAction,
  UnsubscribeUserRequestAction,
  UnsubscribeUserSuccessAction,
  UpdateUserErrorAction,
  UpdateUserRequestAction,
  UpdateUserSuccessAction,
} from '../types/userActionTypes';
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
import { CleanErrorAction, CleanUserErrorAction } from '../types/actionTypes';
import rootReducer from '../reducers';

export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface IAvatar {
  userName: string;
  avatar: string;
  onlineBadge?: any;
  classes: { photoWrapper: string; photoInner: string; photoInnerImg: string };
}
export interface IAvatarCropper {
  editProfile: () => void;
  fieldName: string;
}
export interface IButton {
  buttonName: string;
  onClick: () => void;
  className?: string;
  sx?: object;
}
export interface IChatsPreview {
  conversationId: string;
  sender: number;
  interlocutor: {
    id: number;
    userName: string;
    avatar: string;
    onlineStatus?: string;
    lastSeen?: string;
  };
  body: string;
  createdAt: string;
  isTyping: boolean;
  isRead: boolean;
}
export interface IConfirm {
  messageText: string;
  handleClick: () => void;
  children: React.ReactChild | React.ReactNode;
}
export interface IConfirmButton {
  buttonText: string;
  handleClick: () => void;
}
export interface IPropsMenu {
  id: number;
  propName: string;
  propIcon: string;
  onlyForUser: boolean;
  handleClick: () => void;
}
export interface IContextMenu {
  contextMenuRef: RefObject<HTMLUListElement>;
  contextMenuPosition: {
    x: number;
    y: number;
  };
  hideContextMenu: () => void;
  propsMenu: IPropsMenu[];
}
export interface ICurrentDialog {
  avatar: string;
  conversationId: string;
  interlocutorId: number;
  userName: string;
  onlineStatus: string;
  lastSeen: string;
}
export interface IConversationInfo {
  currentDialog: ICurrentDialog;
}
export interface IConversationMessageMode {
  setIsTyping: (isTyping: boolean) => void;
}
export interface IConversationMessagesList {
  currentDialog: ICurrentDialog;
}
export interface IForwardedFrom {
  _id: string;
  conversation: string;
  sender: number;
  body: string;
  userName: string;
  isEdited: boolean;
  isForwarded: boolean;
  isOriginal: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IRepliedMessage {
  _id: string;
  conversation: string;
  sender: number;
  body: string;
  isEdited: boolean;
  isForwarded: boolean;
  isOriginal: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  forwardedFrom?: IForwardedFrom;
}
export interface FormValues {
  email: string;
  password: string;
  userName?: string;
  confirmPassword?: string;
}
export interface IMessage {
  _id: string;
  sender: number;
  body: string;
  conversation: string;
  isRead: boolean;
  isEdited: boolean;
  isForwarded: boolean;
  isOriginal: boolean;
  forwardedFrom?: IForwardedFrom;
  repliedMessage?: IRepliedMessage;
  createdAt: string;
  updatedAt: string;
}
export interface IMessagePreview {
  _id: string;
  messageId: string;
  sender: number;
  body: string;
  createdAt: string;
  isRead: boolean;
  isTyping: boolean;
  forwardedFrom?: IForwardedFrom | null;
  participants?: number[];
  interlocutor: {
    id: number;
    userName: string;
    avatar: string;
    onlineStatus: string;
    lastSeen: string;
  };
}
export interface IConversationMessagesListItem {
  body: string;
  sender: number;
  createdAt: string;
  typingStatus: boolean;
  isRead: boolean;
  isEdited: boolean;
  isOriginal: boolean;
  isForwarded: boolean;
  i: number;
  id: string;
  conversationId: string;
  observer: IntersectionObserver;
  showContextMenu: (event: React.MouseEvent) => void;
  repliedMessage: IRepliedMessage | undefined;
  replyOn: null | string;
  setReplyOn: (messageId: string | null) => void;
  replyObserver: IntersectionObserver;
  forwardedFrom: IForwardedFrom | undefined;
}
export interface IErrorComponent {
  error: {
    message: string;
    status: number;
  };
}
export interface IError {
  message: string;
  status?: number;
}
export interface IAuthForm {
  formType: string;
}
export interface IAuthInput {
  name: string;
  type?: string;
  placeholder?: string;
}
export interface IConversationForm {
  currentDialog: ICurrentDialog;
  textArea: React.RefObject<HTMLTextAreaElement>;
  setIsTyping: (isTyping: boolean) => void;
  setIsTouched: (isTyping: boolean) => void;
}
export interface IConversationFormInput {
  name: string;
  textArea: React.RefObject<HTMLTextAreaElement>;
  setIsTyping: (isTyping: boolean) => void;
  setIsTouched: (isTouched: boolean) => void;
}
export interface IInput {
  name: string;
  className: string;
}
export interface IUserFormButton {
  fieldName: string;
  type?: 'button' | 'reset' | 'submit';
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isValidatable?: boolean;
  children: string;
}
export interface IUserFormInput {
  name: string;
  type: string;
}
export interface IUserUpdateForm {
  id: number;
  name: string;
  value: string;
  type: string;
  editProfile: () => void;
}
export interface IOnlineBadge {
  currentStatus: string | undefined;
  isMessageRead: boolean;
  messageSender: number;
  classes: {
    onlineWrapper: string;
    onlineWrapperNotRead: string;
    online: string;
    zoomIn: string;
    zoomOut: string;
  };
}
export interface IUserData {
  id: number;
  userName: string;
  name?: null | string;
  email?: string;
  avatar: string;
  bio?: null | string;
  onlineStatus: string;
  lastSeen: string;
  followers: number;
  following: number;
  isFollowed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface IProfileSettingsProp {
  isEdit: boolean;
  name: string;
  value: string;
  type: string;
  editProfile: () => void;
  handleSetting: (
    value: string | undefined,
    name: string,
    type: string
  ) => void;
}
export interface IProfile {
  userData: IUserData;
  profileSettings: IProfileSettingsProp;
}
export interface IProfileSettings {
  handleProfileEdit: () => void;
  settings: IProfileSettingsProp;
}
export interface ITypingAnimation {
  classes: string;
}
export interface IUserProfileContent {
  userData: IUserData;
}
export interface IUserProfileInfo {
  userData: IUserData;
}
export interface IUserProfileOnlineStatus {
  userData: {
    onlineStatus: string;
    lastSeen: string;
  };
  classes: {
    online_status_container: string;
    online_status: string;
    last_seen: string;
  };
}
export interface IUserProfileSetting {
  name: string;
  type: string;
  iconName: string;
  propertyName: string;
  propertyValue: string;
  handleSetting: (propertyValue: string, name: string, type: string) => void;
  isEdit: boolean;
}
export interface IUserProfileSettings {
  user: {
    id: number;
    userName: string;
    avatar: string;
  };
  settings: IProfileSettingsProp;
}
export interface IUserSubscriptionInfo {
  userData: IUserData;
  handleProfileEdit: () => void;
  handleSubscriptionOpen: () => void;
}
export interface IUserSubscriptionsList {
  handleSubscriptionOpen: () => void;
}
export interface IContextMenuTarget {
  messageId: string;
  numberOfMessages: number;
  sender: number;
  body: string;
  conversationId: string;
  isRead: boolean;
  forwardedFrom?: IForwardedFrom;
  isForwarded?: boolean;
  isOriginal?: boolean;
  prevMessage?: {
    _id: string;
    sender: number;
    body: string;
    conversation: string;
    isRead: boolean;
    isEdited: boolean;
    isOriginal: boolean;
    isForwarded: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
export interface IDeletedMessageData {
  messageId?: string;
  conversationId?: string;
  numberOfMessages?: number;
  sender?: number;
  body?: string;
  interlocutorId?: number;
  isRead?: boolean;
  isOriginal?: boolean;
  isForwarded?: boolean;
  prevMessage?: {
    _id: string;
    sender: number;
    body: string;
    conversation: string;
    isRead: boolean;
    isEdited: boolean;
    isOriginal: boolean;
    isForwarded: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
export interface IEditMessageMode {
  isEdit: boolean;
  message: {
    messageId?: string;
    sender?: number;
    body?: string;
    interlocutorId?: number;
    conversationId?: string;
    isRead?: boolean;
  };
}
export interface IDeleteMessageMode {
  isDelete: boolean;
  message: IDeletedMessageData;
}
export interface IReplyMessageMode {
  isReply: boolean;
  message: {
    messageId?: string;
    sender?: number;
    body?: string;
    interlocutorId?: number;
    conversationId?: string;
    isRead?: boolean;
    forwardedFrom?: IForwardedFrom;
  };
}
export interface IForwardMessageMode {
  isChatListOpen: boolean;
  isForward: boolean;
  message: {
    messageId?: string;
    sender?: number;
    body?: string;
    interlocutorId?: number;
    conversationId?: string;
    isRead?: boolean;
    forwardedFrom?: IForwardedFrom;
    isForwarded?: boolean;
  };
}
export interface UserState {
  user: null | IUserData;
  users: any[];
  userProfile: null | IUserData;
  profileSubscriptions: {
    type: null | 'Follower' | 'Followers' | 'Following';
    subscriptions: Array<IUserData>;
  };
  subscriptionsLimit: number;
  subscriptionsOffset: number;
  haveMoreSubscriptions: boolean;
  isFetching: boolean;
  isFetchingProfile: boolean;
  error: null | IError;
}
export interface ChatState {
  isFetching: boolean;
  isMessagesFetching: boolean;
  isChatsFetching: boolean;
  isChatInfoOpen: boolean;
  limit: number;
  offset: number;
  haveMore: boolean;
  messages: IMessage[] | [];
  messagesPreview: IMessagePreview[] | [];
  unreadMessages: Array<{ _id: string; count: number }> | [];
  currentDialog: null | ICurrentDialog;
  contextMenuTarget: null | IContextMenuTarget;
  editMessageMode: IEditMessageMode;
  deleteMessageMode: IDeleteMessageMode;
  replyMessageMode: IReplyMessageMode;
  forwardMessageMode: IForwardMessageMode;
  error: null | IError;
}

export type RootState = ReturnType<typeof rootReducer>;

export type UserAction =
  | SignInRequestAction
  | SignInSuccessAction
  | SignInErrorAction
  | SignUpRequestAction
  | SignUpSuccessAction
  | SignUpErrorAction
  | RefreshRequestAction
  | RefreshSuccessAction
  | RefreshErrorAction
  | LogoutSuccessAction
  | LogoutErrorAction
  | CleanProfileSubscriptionsAction
  | CleanUserProfileAction
  | GetAuthUserErrorAction
  | GetAuthUserRequestAction
  | GetAuthUserSuccessAction
  | GetOnlineStatusAction
  | GetOnlineStatusErrorAction
  | GetOnlineStatusRequestAction
  | GetOnlineUsersAction
  | GetOnlineUsersErrorAction
  | GetOnlineUsersRequestAction
  | GetUserErrorAction
  | GetUserFollowersErrorAction
  | GetUserFollowersRequestAction
  | GetUserFollowersSuccessAction
  | GetUserFollowingErrorAction
  | GetUserFollowingRequestAction
  | GetUserFollowingSuccessAction
  | GetUserRequestAction
  | GetUsersErrorAction
  | GetUsersRequestAction
  | GetUsersSuccessAction
  | GetUserSuccessAction
  | SetOnlineStatusAction
  | SetOnlineStatusErrorAction
  | SetOnlineStatusRequestAction
  | SubscribeUserErrorAction
  | SubscribeUserProfileErrorAction
  | SubscribeUserProfileRequestAction
  | SubscribeUserRequestAction
  | SubscribeUserSuccessAction
  | UnsubscribeUserErrorAction
  | UnsubscribeUserProfileErrorAction
  | UnsubscribeUserProfileRequestAction
  | UnsubscribeUserRequestAction
  | UnsubscribeUserSuccessAction
  | UpdateUserErrorAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | CleanErrorAction
  | CleanUserErrorAction;

export type ChatAction =
  | ChooseCurrentChatAction
  | ClearChatsSuccessAction
  | ClearCurrentChatAction
  | CreateMessageErrorAction
  | CreateMessageRequestAction
  | CreateMessageSuccessAction
  | DeleteMessageErrorAction
  | DeleteMessageRequestAction
  | DeleteMessageSuccessAction
  | EditMessageErrorAction
  | EditMessageRequestAction
  | EditMessageSuccessAction
  | ForwardMessageErrorAction
  | ForwardMessageRequestAction
  | ForwardMessageSuccessAction
  | GetChatsErrorAction
  | GetChatsOnReconnectErrorAction
  | GetChatsOnReconnectRequestAction
  | GetChatsOnReconnectSuccessAction
  | GetChatsRequestAction
  | GetChatsSuccessAction
  | GetMessagesErrorAction
  | GetMessagesOnReconnectErrorAction
  | GetMessagesOnReconnectRequestAction
  | GetMessagesOnReconnectSuccessAction
  | GetMessagesRequestAction
  | GetMessagesSuccessAction
  | ReplyMessageErrorAction
  | ReplyMessageRequestAction
  | ReplyMessageSuccessAction
  | SetChatInfoOpenAction
  | SetContextMenuTargetAction
  | SetContextMenuTargetErrorAction
  | SetDeleteMessageModeAction
  | SetEditMessageModeAction
  | SetForwardMessageModeAction
  | SetReplyMessageModeAction
  | SetSeenMessageErrorAction
  | SetSeenMessageRequestAction
  | SetSeenMessageSuccessAction
  | SetTypingStatusAction
  | StartDialogErrorAction
  | StartDialogRequestAction
  | StartDialogSuccessAction
  | StartTypingErrorAction
  | StartTypingRequestAction
  | StopTypingErrorAction
  | StopTypingRequestAction
  | SubscribeChatsErrorAction
  | SubscribeChatsRequestAction;
