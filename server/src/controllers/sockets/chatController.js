const { User } = require('../../models');
const { Message, Conversation } = require('../../models/mongo');
const {
  SOCKET_EVENTS: {
    NEW_MESSAGE,
    SUBSCRIBE_CHATS,
    UNSUBSCRIBE_CHATS,
    START_TYPING,
    STOP_TYPING,
    TYPING_STATUS,
    SET_SEEN_MESSAGE,
    SEEN_MESSAGE,
  },
} = require('../../constants');

module.exports.subscribeChats = socket =>
  socket.on(SUBSCRIBE_CHATS, ({ userId, conversations }) => {
    socket.join(userId);
    conversations.forEach(conversation => {
      socket.join(conversation);
    });
  });
module.exports.unSubscribeChats = socket =>
  socket.on(UNSUBSCRIBE_CHATS, ({ userId, conversations }) => {
    socket.leave(userId);
    conversations.forEach(conversation => socket.leave(conversation));
  });
module.exports.startTyping = socket =>
  socket.on(START_TYPING, conversationId => {
    socket
      .to(conversationId)
      .emit(TYPING_STATUS, { status: true, conversationId });
  });
module.exports.stopTyping = socket =>
  socket.on(STOP_TYPING, conversationId => {
    socket
      .to(conversationId)
      .emit(TYPING_STATUS, { status: false, conversationId });
  });
module.exports.sendMessage = socket =>
  socket.on(
    NEW_MESSAGE,
    async ({ userId, interlocutor, conversations, messageBody }) => {
      // try {
      const participants = [userId, interlocutor];
      participants.sort(
        (participant1, participant2) => participant1 - participant2
      );
      const newConversation = await Conversation.findOneAndUpdate(
        {
          participants,
        },
        {
          participants,
          blackList: [false, false],
          favoriteList: [false, false],
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
          useFindAndModify: false,
        }
      );
      const message = await new Message({
        sender: userId,
        body: messageBody,
        conversation: newConversation._id,
      }).save();
      const newMessage = {
        _id: message._id,
        conversationId: message.conversation,
        sender: message.sender,
        body: message.body,
        participants,
        isRead: message.isRead,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      };
      const users = await User.findAll({
        where: {
          id: participants,
        },
        attributes: ['id', 'login', 'email', 'avatar'],
      });
      const preview = {
        _id: newConversation._id,
        messageId: message._id,
        sender: userId,
        body: messageBody,
        createdAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        isTyping: false,
      };

      if (!conversations.includes(newConversation._id.toString())) {
        socket.join(newConversation._id.toString());
      }
      socket.to(interlocutor).emit(NEW_MESSAGE, {
        message: newMessage,
        preview: {
          ...preview,
          interlocutor: users.filter(user => user.dataValues.id === userId)[0]
            .dataValues,
        },
      });
      socket.emit(NEW_MESSAGE, {
        message: newMessage,
        preview: {
          ...preview,
          interlocutor: users.filter(
            user => user.dataValues.id === interlocutor
          )[0].dataValues,
        },
      });
    }
  );
module.exports.setSeenMessage = socket => {
  socket.on(SET_SEEN_MESSAGE, async messageId => {
    const message = await Message.findOneAndUpdate(
      { _id: messageId },
      { isRead: true },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      }
    );
    socket.to(message.conversation.toString()).emit(SEEN_MESSAGE, {
      id: message._id,
      conversationId: message.conversation,
      status: true,
    });
    socket.emit(SEEN_MESSAGE, {
      id: message._id,
      conversationId: message.conversation,
      status: true,
    });
  });
};
