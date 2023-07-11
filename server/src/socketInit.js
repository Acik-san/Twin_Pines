const socketServer = require('socket.io');
const {
  setOnlineStatus,
  getOnlineUsers,
  disconnect,
} = require('./controllers/sockets/userController');
const {
  subscribeChats,
  unSubscribeChats,
  startTyping,
  stopTyping,
  sendMessage,
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
    getOnlineUsers(socket, users);
    subscribeChats(socket);
    unSubscribeChats(socket);
    startTyping(socket);
    stopTyping(socket);
    sendMessage(socket);
    disconnect(socket, users);
  });
};
