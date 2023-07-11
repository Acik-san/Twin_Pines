module.exports = {
  ACCESS_TOKEN_SECRET: 'asdasdasd4as5d4as8d7a8sd4as65d4a8sd7asd4as56d4',
  ACCESS_TOKEN_TIME: '30m',
  REFRESH_TOKEN_SECRET: 'ksdjksdj4272jghfuvyy23n82cve2h39fsdkfjkj23283',
  REFRESH_TOKEN_TIME: '30d',
  MAX_DEVICE_AMOUNT: 2,
  SALT_ROUNDS: 5,
  SOCKET_EVENTS: {
    CONNECT: 'connect',
    SET_ONLINE_STATUS: 'SET_ONLINE_STATUS',
    ONLINE_STATUS: 'ONLINE_STATUS',
    GET_ONLINE_USERS: 'GET_ONLINE_USERS',
    ONLINE_USERS: 'ONLINE_USERS',
    NEW_MESSAGE: 'NEW_MESSAGE',
    NEW_MESSAGE_ERROR: 'NEW_MESSAGE_ERROR',
    SUBSCRIBE_CHATS: 'SUBSCRIBE_CHATS',
    UNSUBSCRIBE_CHATS: 'UNSUBSCRIBE_CHATS',
    START_TYPING: 'START_TYPING',
    STOP_TYPING: 'STOP_TYPING',
    TYPING_STATUS: 'TYPING_STATUS',
    DISCONNECT: 'disconnect',
  },
  STATUS: {
    ONLINE: 'online',
    OFFLINE: 'offline',
  },
};
