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
    { id: 3, name: 'login', placeholder: 'Login' },
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
  },
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  publicURL:
    env === 'production'
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/images/`,
};

export default CONSTANTS;
