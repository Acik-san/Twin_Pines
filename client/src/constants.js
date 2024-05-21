const env = process.env.NODE_ENV || 'development';
const serverIP = '192.168.0.107';
const serverPort = 5000;
const CONSTANTS = {
  SIGN_IN_FORM_FIELDS: [
    { id: 1, name: 'email', placeholder: 'Email' },
    { id: 2, type: 'password', name: 'password', placeholder: 'Password' },
  ],
  SIGN_UP_FORM_FIELDS: [
    { id: 1, name: 'email', placeholder: 'Email' },
    { id: 3, name: 'userName', placeholder: 'Username' },
    { id: 2, type: 'password', name: 'password', placeholder: 'Password' },
    {
      id: 4,
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'Confirm Password',
    },
  ],
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  STATIC_IMAGES_PATH: '/static/images/',
  ANONYM_IMAGE_PATH: '/static/images/anon.png',
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  WS_BASE_URL: `ws://${serverIP}:${serverPort}/`,
  SOCKET_EVENTS: {
    NEW_MESSAGE: 'NEW_MESSAGE',
    NEW_MESSAGE_ERROR: 'NEW_MESSAGE_ERROR',
    SUBSCRIBE_USER_PROFILE: 'SUBSCRIBE_USER_PROFILE',
    UNSUBSCRIBE_USER_PROFILE: 'UNSUBSCRIBE_USER_PROFILE',
    SUBSCRIBE_CHATS: 'SUBSCRIBE_CHATS',
    UNSUBSCRIBE_CHATS: 'UNSUBSCRIBE_CHATS',
    START_TYPING: 'START_TYPING',
    STOP_TYPING: 'STOP_TYPING',
    TYPING_STATUS: 'TYPING_STATUS',
    SET_ONLINE_STATUS: 'SET_ONLINE_STATUS',
    ONLINE_STATUS: 'ONLINE_STATUS',
    GET_ONLINE_USERS: 'GET_ONLINE_USERS',
    ONLINE_USERS: 'ONLINE_USERS',
    SET_SEEN_MESSAGE: 'SET_SEEN_MESSAGE',
    SEEN_MESSAGE: 'SEEN_MESSAGE',
    EDIT_MESSAGE: 'EDIT_MESSAGE',
    EDITED_MESSAGE: 'EDITED_MESSAGE',
    DELETE_MESSAGE: 'DELETE_MESSAGE',
    DELETED_MESSAGE: 'DELETED_MESSAGE',
    REPLY_MESSAGE: 'REPLY_MESSAGE',
    REPLIED_MESSAGE: 'REPLIED_MESSAGE',
  },
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  publicURL:
    env === 'production'
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/images/`,
  HEADER: {
    HAMBURGER_MENU: [{ id: 1 }, { id: 2 }, { id: 3 }],
    LOGINED_BUTTONS: [
      {
        id: 1,
        type: 'link',
        path: '/profile',
        text: 'Profile',
        name: 'profile',
      },
      { id: 2, type: 'link', path: '/chats', text: 'Chats', name: 'chats' },
      { id: 3, type: 'button', text: 'Logout', name: 'logout' },
    ],
    AUTH_BUTTONS: [
      {
        id: 1,
        type: 'link',
        path: '/sign-in',
        text: 'Sign-in',
        name: 'sign-in',
      },
      {
        id: 2,
        type: 'link',
        path: '/sign-up',
        text: 'Sign-up',
        name: 'sign-up',
      },
    ],
  },
  USER_PROFILE_SETTINGS: [
    {
      id: 1,
      iconName: 'avatar_icon',
      propertyName: 'Change profile photo',
      name: 'avatar',
      type: 'file',
    },
    {
      id: 2,
      iconName: 'user_icon',
      propertyName: 'Username',
      name: 'userName',
      type: 'text',
    },
    {
      id: 3,
      iconName: 'name_icon',
      propertyName: 'Name',
      name: 'name',
      type: 'text',
    },
    {
      id: 4,
      iconName: 'email_icon',
      propertyName: 'User email',
      name: 'email',
      type: 'text',
    },
    {
      id: 5,
      iconName: 'password_icon',
      propertyName: 'Change password',
      name: 'password',
      type: 'password',
    },
  ],
  CONTEXT_MENU_SETTINGS: [
    {
      id: 1,
      propName: 'reply',
      propIcon: '/static/images/svg/reply.svg',
      onlyForUser: false,
    },
    {
      id: 2,
      propName: 'edit',
      propIcon: '/static/images/svg/edit.svg',
      onlyForUser: true,
    },
    {
      id: 3,
      propName: 'copy text',
      propIcon: '/static/images/svg/copy.svg',
      onlyForUser: false,
    },
    {
      id: 4,
      propName: 'delete',
      propIcon: '/static/images/svg/delete.svg',
      onlyForUser: true,
    },
  ],
};

export default CONSTANTS;
