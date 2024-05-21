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
    EDIT_MESSAGE,
    EDITED_MESSAGE,
    DELETE_MESSAGE,
    DELETED_MESSAGE,
    REPLY_MESSAGE,
    REPLIED_MESSAGE,
    FORWARD_MESSAGE,
    FORWARDED_MESSAGE,
  },
} = require('../../constants');

module.exports.subscribeChats = socket =>
  socket.on(SUBSCRIBE_CHATS, ({ userId, conversations }) => {
    socket.join(userId);
    conversations.forEach(({ conversationId, interlocutorId }) => {
      socket.join(conversationId);
      socket.join(`${conversationId}+${userId}`);
      socket.join(interlocutorId);
    });
  });
module.exports.unsubscribeChats = socket =>
  socket.on(UNSUBSCRIBE_CHATS, ({ userId, conversations }) => {
    socket.leave(userId);
    conversations.forEach(({ conversationId, interlocutorId }) => {
      socket.leave(conversationId);
      socket.leave(`${conversationId}+${userId}`);
      socket.leave(interlocutorId);
    });
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
        conversation: message.conversation,
        sender: message.sender,
        body: message.body,
        isRead: message.isRead,
        isEdited: message.isEdited,
        isOriginal: message.isOriginal,
        isForwarded: message.isForwarded,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      };
      const users = await User.findAll({
        where: {
          id: participants,
        },
        attributes: ['id', 'userName', 'avatar', 'onlineStatus', 'lastSeen'],
      });
      const preview = {
        _id: newConversation._id,
        messageId: message._id,
        sender: userId,
        body: messageBody,
        createdAt: message.createdAt,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        isTyping: false,
        isRead: message.isRead,
      };
      if (!conversations.includes(newConversation._id.toString())) {
        socket.join(newConversation._id.toString());
      }
      socket
        .to(`${newConversation._id.toString()}+${interlocutor}`)
        .emit(NEW_MESSAGE, {
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

module.exports.editMessage = socket => {
  socket.on(EDIT_MESSAGE, async ({ messageId, conversationId, editedBody }) => {
    await Message.findOneAndUpdate(
      { _id: messageId },
      { isEdited: true, body: editedBody },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      }
    );
    socket.to(conversationId).emit(EDITED_MESSAGE, {
      id: messageId,
      conversationId,
      isEdited: true,
      body: editedBody,
    });
    socket.emit(EDITED_MESSAGE, {
      id: messageId,
      conversationId,
      isEdited: true,
      body: editedBody,
    });
  });
};

module.exports.deleteMessage = socket => {
  socket.on(
    DELETE_MESSAGE,
    async ({
      messageId,
      conversationId,
      prevMessage,
      numberOfMessages,
      isRead,
      isOriginal,
      isForwarded,
    }) => {
      if (isOriginal && isForwarded) {
        await Message.findOneAndUpdate(
          { _id: messageId },
          { isDeletedFlag: true }
        );
      } else {
        await Message.findOneAndDelete({ _id: messageId });
      }
      socket.to(conversationId).emit(DELETED_MESSAGE, {
        id: messageId,
        conversationId,
        prevMessage,
        numberOfMessages,
        isRead,
      });
      socket.emit(DELETED_MESSAGE, {
        id: messageId,
        conversationId,
        prevMessage,
        numberOfMessages,
        isRead,
      });
    }
  );
};

module.exports.replyMessage = socket => {
  socket.on(
    REPLY_MESSAGE,
    async ({
      userId,
      interlocutorId,
      messageId,
      forwardedFrom,
      conversationId,
      body,
    }) => {
      const message = await new Message({
        sender: userId,
        body,
        conversation: conversationId,
        repliedMessage: messageId,
      }).save();
      await message.populate('repliedMessage');
      let newMessage = message;
      if (forwardedFrom) {
        const forwardedFromUserName = await User.findByPk(
          forwardedFrom.sender,
          {
            attributes: ['userName'],
          }
        );
        newMessage = {
          _id: message._id,
          conversation: message.conversation,
          sender: message.sender,
          body: message.body,
          isRead: message.isRead,
          isEdited: message.isEdited,
          isOriginal: message.isOriginal,
          isForwarded: message.isForwarded,
          repliedMessage:
            message.repliedMessage === null
              ? messageId
              : {
                  _id: message.repliedMessage._id,
                  sender: message.repliedMessage.sender,
                  userName: forwardedFromUserName.dataValues.userName,
                  body: message.repliedMessage.body,
                  conversation: message.repliedMessage.conversation,
                  isRead: message.repliedMessage.isRead,
                  isEdited: message.repliedMessage.isEdited,
                  isOriginal: message.repliedMessage.isOriginal,
                  isForwarded: message.repliedMessage.isForwarded,
                  forwardedFrom: forwardedFrom,
                },
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        };
      }

      socket.to(conversationId).emit(REPLIED_MESSAGE, {
        interlocutorId: userId,
        conversationId,
        message: newMessage,
      });
      socket.emit(REPLIED_MESSAGE, {
        interlocutorId,
        conversationId,
        message: newMessage,
      });
    }
  );
};

module.exports.forwardMessage = socket => {
  socket.on(
    FORWARD_MESSAGE,
    async ({
      userId,
      interlocutorId,
      messageId,
      forwardedFrom,
      conversationId,
      body,
      forwardedBody,
      isForwarded,
    }) => {
      let extraMessage;
      if (body) {
        const message = await new Message({
          sender: userId,
          body,
          conversation: conversationId,
        }).save();
        extraMessage = {
          _id: message._id,
          conversation: message.conversation,
          sender: message.sender,
          body: message.body,
          isRead: message.isRead,
          isEdited: message.isEdited,
          isOriginal: message.isOriginal,
          isForwarded: message.isForwarded,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        };
      }
      const message = await new Message({
        sender: userId,
        body: forwardedBody,
        conversation: conversationId,
        isOriginal: false,
        forwardedFrom: forwardedFrom ? forwardedFrom : messageId,
      }).save();

      await message.populate('forwardedFrom');

      let forwardedMessage;
      if (!isForwarded) {
        forwardedMessage = await Message.findOneAndUpdate(
          { _id: messageId },
          { isForwarded: true }
        );
      }
      const forwardedFromUserName = await User.findByPk(
        message.forwardedFrom.sender,
        {
          attributes: ['userName'],
        }
      );

      const newMessage = {
        _id: message._id,
        conversation: message.conversation,
        sender: message.sender,
        body: message.body,
        isRead: message.isRead,
        isEdited: message.isEdited,
        isOriginal: message.isOriginal,
        isForwarded: message.isForwarded,
        forwardedFrom:
          message.forwardedFrom === null
            ? messageId
            : {
                _id: message.forwardedFrom._id,
                sender: message.forwardedFrom.sender,
                userName: forwardedFromUserName.dataValues.userName,
                body: message.forwardedFrom.body,
                conversation: message.forwardedFrom.conversation,
                isRead: message.forwardedFrom.isRead,
                isEdited: message.forwardedFrom.isEdited,
                isOriginal: message.forwardedFrom.isOriginal,
                isForwarded: true,
                createdAt: message.forwardedFrom.createdAt,
                updatedAt: message.forwardedFrom.updatedAt,
              },
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      };
      socket.to(conversationId).emit(FORWARDED_MESSAGE, {
        interlocutorId: userId,
        conversationId,
        message: newMessage,
        extraMessage,
        forwardedMessageId: forwardedMessage?._id,
      });
      socket.emit(FORWARDED_MESSAGE, {
        interlocutorId,
        conversationId,
        message: newMessage,
        extraMessage,
        forwardedMessageId: forwardedMessage?._id,
      });
    }
  );
};
