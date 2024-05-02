const { User, Subscription } = require('../../models');
const {
  SOCKET_EVENTS: {
    SET_ONLINE_STATUS,
    GET_ONLINE_STATUS,
    SUBSCRIBE_USER_PROFILE,
    UNSUBSCRIBE_USER_PROFILE,
    ONLINE_STATUS,
    GET_ONLINE_STATUS_INFO,
    GET_ONLINE_USERS,
    ONLINE_USERS,
    TYPING_STATUS,
    DISCONNECT,
  },
  STATUS: { ONLINE, OFFLINE },
} = require('../../constants');

module.exports.setOnlineStatus = (socket, users) =>
  socket.on(SET_ONLINE_STATUS, async ({ userId, status }) => {
    if (!users.has(socket.id) && status === ONLINE) {
      users.set(socket.id, userId);
      await User.update({ onlineStatus: status }, { where: { id: userId } });
    }
    if (users.has(socket.id) && status === OFFLINE) {
      users.delete(socket.id);
      await User.update(
        { onlineStatus: status, lastSeen: new Date() },
        { where: { id: userId } }
      );
    }
    socket.to(userId).emit(ONLINE_STATUS, { userId, status });
  });
module.exports.getOnlineStatus = socket =>
  socket.on(GET_ONLINE_STATUS, async ({ userId }) => {
    const onlineStatusInfo = await User.findByPk(userId, {
      attributes: {
        exclude: [
          'id',
          'userName',
          'name',
          'email',
          'password',
          'avatar',
          'bio',
          'createdAt',
          'updatedAt',
        ],
      },
    });
    socket.emit(GET_ONLINE_STATUS_INFO, onlineStatusInfo.dataValues);
  });

module.exports.subscribeUserProfile = socket =>
  socket.on(SUBSCRIBE_USER_PROFILE, ({ userId }) => {
    socket.join(userId);
  });
module.exports.unsubscribeUserProfile = socket =>
  socket.on(UNSUBSCRIBE_USER_PROFILE, ({ userId }) => {
    socket.leave(userId);
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
  socket.on(DISCONNECT, async reason => {
    if (users.has(socket.id)) {
      socket.broadcast.emit(TYPING_STATUS, {
        status: false,
        userId: users.get(socket.id),
      });
      socket.to(users.get(socket.id)).emit(ONLINE_STATUS, {
        userId: users.get(socket.id),
        status: OFFLINE,
      });
      await User.update(
        { onlineStatus: OFFLINE, lastSeen: new Date() },
        { where: { id: users.get(socket.id) } }
      );
      users.delete(socket.id);
    }
    console.log(reason);
  });
