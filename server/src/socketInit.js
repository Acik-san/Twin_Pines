const socketServer = require('socket.io');
const {
  setOnlineStatus,
  getOnlineStatus,
  subscribeUserProfile,
  unsubscribeUserProfile,
  getOnlineUsers,
  disconnect,
} = require('./controllers/sockets/userController');
const {
  subscribeChats,
  unsubscribeChats,
  startTyping,
  stopTyping,
  sendMessage,
  setSeenMessage,
  editMessage,
  deleteMessage,
  replyMessage,
} = require('./controllers/sockets/chatController');
const {
  SOCKET_EVENTS: { CONNECT },
} = require('./constants');

module.exports.createConnection = httpServer => {
  const io = socketServer(httpServer, {
    transports: ['websocket', 'polling'],
    cors: {
      origin: '*',
    },
  });

  const users = new Map();

  io.on(CONNECT, socket => {
    setOnlineStatus(socket, users);
    getOnlineStatus(socket);
    subscribeUserProfile(socket);
    unsubscribeUserProfile(socket);
    getOnlineUsers(socket, users);
    subscribeChats(socket);
    unsubscribeChats(socket);
    startTyping(socket);
    stopTyping(socket);
    sendMessage(socket);
    disconnect(socket, users);
    setSeenMessage(socket);
    editMessage(socket);
    deleteMessage(socket);
    replyMessage(socket);
  });
};
