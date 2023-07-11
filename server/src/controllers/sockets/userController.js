const {
  SOCKET_EVENTS: {
    SET_ONLINE_STATUS,
    ONLINE_STATUS,
    GET_ONLINE_USERS,
    ONLINE_USERS,
    TYPING_STATUS,
    DISCONNECT,
  },
  STATUS: { ONLINE, OFFLINE },
} = require('../../constants');

module.exports.setOnlineStatus = (socket, users) =>
  socket.on(SET_ONLINE_STATUS, ({ userId, status }) => {
    if (!users.has(socket.id) && status === ONLINE) {
      users.set(socket.id, userId);
    }
    if (users.has(socket.id) && status === OFFLINE) {
      users.delete(socket.id);
    }
    socket.broadcast.emit(ONLINE_STATUS, { userId, status });
  });

module.exports.getOnlineUsers = (socket, users) =>
  socket.on(GET_ONLINE_USERS, () => {
    const usersIdArr = [];
    users.forEach(value => {
      usersIdArr.push(value);
    });
    socket.emit(ONLINE_USERS, usersIdArr);
  });

module.exports.disconnect = (socket, users) =>
  socket.on(DISCONNECT, reason => {
    socket.broadcast.emit(TYPING_STATUS, {
      status: false,
      userId: users.get(socket.id),
    });
    if (users.has(socket.id)) {
      socket.broadcast.emit(ONLINE_STATUS, {
        userId: users.get(socket.id),
        status: OFFLINE,
      });
      users.delete(socket.id);
    }
    console.log(reason);
  });
