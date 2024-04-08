const ACTION_TYPES = {
  //auth
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_ERROR: 'SIGN_IN_ERROR',
  //
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  //
  REFRESH_REQUEST: 'REFRESH_REQUEST',
  REFRESH_SUCCESS: 'REFRESH_SUCCESS',
  REFRESH_ERROR: 'REFRESH_ERROR',
  //
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR',
  //
  GET_AUTH_USER_REQUEST: 'GET_AUTH_USER_REQUEST',
  GET_AUTH_USER_SUCCESS: 'GET_AUTH_USER_SUCCESS',
  GET_AUTH_USER_ERROR: 'GET_AUTH_USER_ERROR',
  //users
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
  //
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_ERROR: 'GET_USERS_ERROR',
  //
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_ERROR: 'GET_USER_ERROR',
  //
  SUBSCRIBE_USER_REQUEST: 'SUBSCRIBE_USER_REQUEST',
  SUBSCRIBE_USER_SUCCESS: 'SUBSCRIBE_USER_SUCCESS',
  SUBSCRIBE_USER_ERROR: 'SUBSCRIBE_USER_ERROR',
  //
  UNSUBSCRIBE_USER_REQUEST: 'UNSUBSCRIBE_USER_REQUEST',
  UNSUBSCRIBE_USER_SUCCESS: 'UNSUBSCRIBE_USER_SUCCESS',
  UNSUBSCRIBE_USER_ERROR: 'UNSUBSCRIBE_USER_ERROR',
  //
  SUBSCRIBE_USER_PROFILE_REQUEST: 'SUBSCRIBE_USER_PROFILE_REQUEST',
  SUBSCRIBE_USER_PROFILE_ERROR: 'SUBSCRIBE_USER_PROFILE_ERROR',
  //
  UNSUBSCRIBE_USER_PROFILE_REQUEST: 'UNSUBSCRIBE_USER_PROFILE_REQUEST',
  UNSUBSCRIBE_USER_PROFILE_ERROR: 'UNSUBSCRIBE_USER_PROFILE_ERROR',
  //
  GET_USER_FOLLOWERS_REQUEST: 'GET_USER_FOLLOWERS_REQUEST',
  GET_USER_FOLLOWERS_SUCCESS: 'GET_USER_FOLLOWERS_SUCCESS',
  GET_USER_FOLLOWERS_ERROR: 'GET_USER_FOLLOWERS_ERROR',
  //
  GET_USER_FOLLOWING_REQUEST: 'GET_USER_FOLLOWING_REQUEST',
  GET_USER_FOLLOWING_SUCCESS: 'GET_USER_FOLLOWING_SUCCESS',
  GET_USER_FOLLOWING_ERROR: 'GET_USER_FOLLOWING_ERROR',
  //
  CLEAN_USER_PROFILE: 'CLEAN_USER_PROFILE',
  //
  CLEAN_PROFILE_SUBSCRIPTIONS: 'CLEAN_PROFILE_SUBSCRIPTIONS',
  //
  CLEAN_USER_ERROR: 'CLEAN_USER_ERROR',
  //
  CLEAN_ERROR: 'CLEAN_ERROR',
  //chats
  CREATE_MESSAGE_REQUEST: 'CREATE_MESSAGE_REQUEST',
  CREATE_MESSAGE_SUCCESS: 'CREATE_MESSAGE_SUCCESS',
  CREATE_MESSAGE_ERROR: 'CREATE_MESSAGE_ERROR',
  //
  GET_MESSAGES_REQUEST: 'GET_MESSAGES_REQUEST',
  GET_MESSAGES_SUCCESS: 'GET_MESSAGES_SUCCESS',
  GET_MESSAGES_ERROR: 'GET_MESSAGES_ERROR',
  //
  GET_CHATS_REQUEST: 'GET_CHATS_REQUEST',
  GET_CHATS_SUCCESS: 'GET_CHATS_SUCCESS',
  GET_CHATS_ERROR: 'GET_CHATS_ERROR',
  //
  CHOOSE_CURRENT_CHAT: 'CHOOSE_CURRENT_CHAT',
  // CHOOSE_CURRENT_CHAT_SUCCESS: 'CHOOSE_CURRENT_CHAT_SUCCESS',
  // CHOOSE_CURRENT_CHAT_ERROR: 'CHOOSE_CURRENT_CHAT_ERROR',
  //
  CLEAR_CHATS_SUCCESS: 'CLEAR_CHATS_SUCCESS',
  //
  CLEAR_CURRENT_CHAT: 'CLEAR_CURRENT_CHAT',
  //
  SET_IS_TYPING: 'SET_IS_TYPING',
  //
  SET_ONLINE_STATUS_REQUEST: 'SET_ONLINE_STATUS_REQUEST',
  SET_ONLINE_STATUS_ERROR: 'SET_ONLINE_STATUS_ERROR',
  SET_ONLINE_STATUS: 'SET_ONLINE_STATUS',
  //
  GET_ONLINE_USERS: 'GET_ONLINE_USERS',
  //
  SUBSCRIBE_CHATS_REQUEST: 'SUBSCRIBE_CHATS_REQUEST',
  SUBSCRIBE_CHATS_ERROR: 'SUBSCRIBE_CHATS_ERROR',
  //
  GET_ONLINE_USERS_REQUEST: 'GET_ONLINE_USERS_REQUEST',
  GET_ONLINE_USERS_ERROR: 'GET_ONLINE_USERS_ERROR',
  //
  START_TYPING_REQUEST: 'START_TYPING_REQUEST',
  START_TYPING_ERROR: 'START_TYPING_ERROR',
  STOP_TYPING_REQUEST: 'STOP_TYPING_REQUEST',
  STOP_TYPING_ERROR: 'STOP_TYPING_ERROR',
  //
  SET_SEEN_MESSAGE_REQUEST: 'SET_SEEN_MESSAGE_REQUEST',
  SET_SEEN_MESSAGE_SUCCESS: 'SET_SEEN_MESSAGE_SUCCESS',
  SET_SEEN_MESSAGE_ERROR: 'SET_SEEN_MESSAGE_ERROR',
  //
  START_DIALOG_REQUEST: 'START_DIALOG_REQUEST',
  START_DIALOG_SUCCESS: 'START_DIALOG_SUCCESS',
  START_DIALOG_ERROR: 'START_DIALOG_ERROR',
  //
  SET_CONTEXT_MENU_TARGET: 'SET_CONTEXT_MENU_TARGET',
  SET_CONTEXT_MENU_TARGET_ERROR: 'SET_CONTEXT_MENU_TARGET_ERROR',
  //
  SET_EDIT_MESSAGE_MODE: 'SET_EDIT_MESSAGE_MODE',
  //
  EDIT_MESSAGE_REQUEST: 'EDIT_MESSAGE_REQUEST',
  EDIT_MESSAGE_SUCCESS: 'EDIT_MESSAGE_SUCCESS',
  EDIT_MESSAGE_ERROR: 'EDIT_MESSAGE_ERROR',
  //
  SET_DELETE_MESSAGE_MODE: 'SET_DELETE_MESSAGE_MODE',
  //
  DELETE_MESSAGE_REQUEST: 'DELETE_MESSAGE_REQUEST',
  DELETE_MESSAGE_SUCCESS: 'DELETE_MESSAGE_SUCCESS',
  DELETE_MESSAGE_ERROR: 'DELETE_MESSAGE_ERROR',
  //
  SET_REPLY_MESSAGE_MODE: 'SET_REPLY_MESSAGE_MODE',
  //
  REPLY_MESSAGE_REQUEST: 'REPLY_MESSAGE_REQUEST',
  REPLY_MESSAGE_SUCCESS: 'REPLY_MESSAGE_SUCCESS',
  REPLY_MESSAGE_ERROR: 'REPLY_MESSAGE_ERROR',
  //
  GET_CHATS_ON_RECONNECT_REQUEST: 'GET_CHATS_ON_RECONNECT_REQUEST',
  GET_CHATS_ON_RECONNECT_SUCCESS: 'GET_CHATS_ON_RECONNECT_SUCCESS',
  GET_CHATS_ON_RECONNECT_ERROR: 'GET_CHATS_ON_RECONNECT_ERROR',
  //
  GET_MESSAGES_ON_RECONNECT_REQUEST: 'GET_MESSAGES_ON_RECONNECT_REQUEST',
  GET_MESSAGES_ON_RECONNECT_SUCCESS: 'GET_MESSAGES_ON_RECONNECT_SUCCESS',
  GET_MESSAGES_ON_RECONNECT_ERROR: 'GET_MESSAGES_ON_RECONNECT_ERROR',
  //
};

export default ACTION_TYPES;
