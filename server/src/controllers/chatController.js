const createError = require('http-errors');
const _ = require('lodash');
const { User } = require('../models');
const { Message, Conversation } = require('../models/mongo');
const { prepareForwardedFromMessages } = require('../utils/usefulFunctions');

module.exports.createConversation = async (req, res, next) => {
  const {
    query: { userId, interlocutorId },
  } = req;
  const participants = [userId, interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
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
    res.status(200).send({
      data: {
        conversation: newConversation._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const {
    params: { id },
    query: { limit, offset },
  } = req;
  const participants = [req.tokenData.userId, Number(id)];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const matchedMessages = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      { $match: { 'conversationData.participants': participants } },
      { $match: { isDeletedFlag: { $ne: true } } },
      { $sort: { createdAt: -1 } },
      {
        $skip: parseInt(offset),
      },
      {
        $limit: parseInt(limit),
      },
      {
        $lookup: {
          from: 'messages',
          localField: 'repliedMessage',
          foreignField: '_id',
          as: 'repliedMessageData',
        },
      },
      {
        $lookup: {
          from: 'messages',
          localField: 'forwardedFrom',
          foreignField: '_id',
          as: 'forwardedFromData',
        },
      },
      {
        $lookup: {
          from: 'messages',
          localField: 'repliedMessageData.forwardedFrom',
          foreignField: '_id',
          as: 'repliedMessageForwardedFromData',
        },
      },
      {
        $project: {
          _id: 1,
          sender: 1,
          body: 1,
          conversation: 1,
          isRead: 1,
          isEdited: 1,
          isOriginal: 1,
          isForwarded: 1,
          repliedMessage: {
            $cond: {
              if: { $eq: ['$repliedMessageData', []] },
              then: {
                $cond: {
                  if: '$repliedMessage',
                  then: { _id: '$repliedMessage' },
                  else: '$$REMOVE',
                },
              },
              else: {
                $let: {
                  vars: {
                    repliedMessageObj: {
                      $arrayElemAt: ['$repliedMessageData', 0],
                    },
                  },
                  in: {
                    $cond: [
                      { $eq: ['$$repliedMessageObj.isDeletedFlag', true] },
                      { _id: '$repliedMessage' },
                      {
                        $mergeObjects: [
                          '$$repliedMessageObj',
                          {
                            forwardedFrom: {
                              $arrayElemAt: [
                                '$repliedMessageForwardedFromData',
                                0,
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
          forwardedFrom: {
            $cond: {
              if: { $eq: ['$forwardedFromData', []] },
              then: {
                $cond: {
                  if: '$forwardedFrom',
                  then: { _id: '$forwardedFrom' },
                  else: '$$REMOVE',
                },
              },
              else: { $arrayElemAt: ['$forwardedFromData', 0] },
            },
          },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    const forwardedFromUsersIdSet = new Set();
    matchedMessages.forEach(message => {
      if (message?.forwardedFrom?.sender) {
        forwardedFromUsersIdSet.add(message.forwardedFrom.sender);
      }
      if (message?.repliedMessage?.forwardedFrom?.sender) {
        forwardedFromUsersIdSet.add(
          message.repliedMessage.forwardedFrom.sender
        );
      }
    });
    const forwardedFromUserNames = await User.findAll({
      where: { id: [...forwardedFromUsersIdSet] },
      attributes: ['id', 'userName'],
    });
    const messages = prepareForwardedFromMessages(
      matchedMessages,
      forwardedFromUserNames.map(user => user.dataValues)
    );
    const haveMore = matchedMessages.length > 0 ? true : false;
    res.status(200).send({
      data: {
        messages,
        haveMore,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversations = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      {
        $unwind: '$conversationData',
      },
      {
        $match: {
          'conversationData.participants': req.tokenData.userId,
        },
      },
      { $match: { isDeletedFlag: { $ne: true } } },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: 'messages',
          localField: 'forwardedFrom',
          foreignField: '_id',
          as: 'forwardedFromData',
        },
      },
      {
        $group: {
          _id: '$conversationData._id',
          messageId: { $first: '$_id' },
          sender: { $first: '$sender' },
          body: { $first: '$body' },
          forwardedFrom: {
            $first: {
              $cond: {
                if: { $eq: ['$forwardedFromData', []] },
                then: {
                  $cond: {
                    if: '$forwardedFrom',
                    then: { _id: '$forwardedFrom' },
                    else: '$$REMOVE',
                  },
                },
                else: { $arrayElemAt: ['$forwardedFromData', 0] },
              },
            },
          },
          createdAt: { $first: '$createdAt' },
          participants: { $first: '$conversationData.participants' },
          isRead: { $first: '$isRead' },
        },
      },
    ]);
    const interlocutors = [];
    const unreadMessages = await Message.aggregate([
      {
        $match: {
          isRead: false,
          isDeletedFlag:{$ne:true},
          sender: { $ne: req.tokenData.userId },
        },
      },
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      {
        $unwind: '$conversationData',
      },
      {
        $match: {
          'conversationData.participants': req.tokenData.userId,
        },
      },
      {
        $group: {
          _id: '$conversationData._id',
          count: { $sum: 1 },
        },
      },
    ]);
    conversations.forEach(conversation => {
      conversation.isTyping = false;
      interlocutors.push(
        conversation.participants.find(
          participant => participant !== req.tokenData.userId
        )
      );
    });
    const senders = await User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'userName', 'avatar', 'onlineStatus', 'lastSeen'],
    });
    conversations.forEach(conversation => {
      senders.forEach(sender => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            userName: sender.dataValues.userName,
            email: sender.dataValues.email,
            avatar: sender.dataValues.avatar,
            onlineStatus: sender.dataValues.onlineStatus,
            lastSeen: sender.dataValues.lastSeen,
          };
        }
      });
    });
    res.status(200).send({ data: { conversations, unreadMessages } });
  } catch (err) {
    next(err);
  }
};

module.exports.getChatOnReconnect = async (req, res, next) => {
  const {
    params: { id },
    query: { lastMessageDate },
  } = req;
  const participants = [req.tokenData.userId, Number(id)];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const matchedMessages = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      { $match: { 'conversationData.participants': participants } },
      { $match: { isDeletedFlag: { $ne: true } } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'messages',
          localField: 'repliedMessage',
          foreignField: '_id',
          as: 'repliedMessageData',
        },
      },
      {
        $lookup: {
          from: 'messages',
          localField: 'forwardedFrom',
          foreignField: '_id',
          as: 'forwardedFromData',
        },
      },
      {
        $lookup: {
          from: 'messages',
          localField: 'repliedMessageData.forwardedFrom',
          foreignField: '_id',
          as: 'repliedMessageForwardedFromData',
        },
      },
      {
        $project: {
          _id: 1,
          sender: 1,
          body: 1,
          conversation: 1,
          isRead: 1,
          isEdited: 1,
          isOriginal: 1,
          isForwarded: 1,
          repliedMessage: {
            $cond: {
              if: { $eq: ['$repliedMessageData', []] },
              then: {
                $cond: {
                  if: '$repliedMessage',
                  then: { _id: '$repliedMessage' },
                  else: '$$REMOVE',
                },
              },
              else: {
                $mergeObjects: [
                  { $arrayElemAt: ['$repliedMessageData', 0] },
                  {
                    forwardedFrom: {
                      $arrayElemAt: ['$repliedMessageForwardedFromData', 0],
                    },
                  },
                ],
              },
            },
          },
          forwardedFrom: {
            $cond: {
              if: { $eq: ['$forwardedFromData', []] },
              then: {
                $cond: {
                  if: '$forwardedFrom',
                  then: { _id: '$forwardedFrom' },
                  else: '$$REMOVE',
                },
              },
              else: { $arrayElemAt: ['$forwardedFromData', 0] },
            },
          },
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $match: {
          createdAt: { $gt: new Date(lastMessageDate) },
          sender: Number(id),
        },
      },
    ]);
    const forwardedFromUsersIdSet = new Set();
    matchedMessages.forEach(message => {
      if (message?.forwardedFrom?.sender) {
        forwardedFromUsersIdSet.add(message.forwardedFrom.sender);
      }
      if (message?.repliedMessage?.forwardedFrom?.sender) {
        forwardedFromUsersIdSet.add(
          message.repliedMessage.forwardedFrom.sender
        );
      }
    });
    const forwardedFromUserNames = await User.findAll({
      where: { id: [...forwardedFromUsersIdSet] },
      attributes: ['id', 'userName'],
    });
    const messages = prepareForwardedFromMessages(
      matchedMessages,
      forwardedFromUserNames.map(user => user.dataValues)
    );
    res.status(200).send({
      data: {
        messages,
      },
    });
  } catch (err) {
    next(err);
  }
};

// module.exports.blackList = async (req, res, next) => {
//   const predicate =
//     'blackList.' + req.body.participants.indexOf(req.tokenData.userId);
//   try {
//     const chat = await Conversation.findOneAndUpdate(
//       { participants: req.body.participants },
//       { $set: { [predicate]: req.body.blackListFlag } },
//       { new: true }
//     );
//     res.send(chat);
//     const interlocutorId = req.body.participants.filter(
//       participant => participant !== req.tokenData.userId
//     )[0];
//     controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
//   } catch (err) {
//     res.send(err);
//   }
// };

// module.exports.favoriteChat = async (req, res, next) => {
//   const predicate =
//     'favoriteList.' + req.body.participants.indexOf(req.tokenData.userId);
//   try {
//     const chat = await Conversation.findOneAndUpdate(
//       { participants: req.body.participants },
//       { $set: { [predicate]: req.body.favoriteFlag } },
//       { new: true }
//     );
//     res.send(chat);
//   } catch (err) {
//     res.send(err);
//   }
// };

// module.exports.createCatalog = async (req, res, next) => {
//   console.log(req.body);
//   const catalog = new Catalog({
//     userId: req.tokenData.userId,
//     catalogName: req.body.catalogName,
//     chats: [req.body.chatId],
//   });
//   try {
//     await catalog.save();
//     res.send(catalog);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports.updateNameCatalog = async (req, res, next) => {
//   try {
//     const catalog = await Catalog.findOneAndUpdate({
//       _id: req.body.catalogId,
//       userId: req.tokenData.userId,
//     }, { catalogName: req.body.catalogName }, { new: true });
//     res.send(catalog);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports.addNewChatToCatalog = async (req, res, next) => {
//   try {
//     const catalog = await Catalog.findOneAndUpdate({
//       _id: req.body.catalogId,
//       userId: req.tokenData.userId,
//     }, { $addToSet: { chats: req.body.chatId } }, { new: true });
//     res.send(catalog);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports.removeChatFromCatalog = async (req, res, next) => {
//   try {
//     const catalog = await Catalog.findOneAndUpdate({
//       _id: req.body.catalogId,
//       userId: req.tokenData.userId,
//     }, { $pull: { chats: req.body.chatId } }, { new: true });
//     res.send(catalog);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports.deleteCatalog = async (req, res, next) => {
//   try {
//     await Catalog.remove(
//       { _id: req.body.catalogId, userId: req.tokenData.userId });
//     res.end();
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports.getCatalogs = async (req, res, next) => {
//   try {
//     const catalogs = await Catalog.aggregate([
//       { $match: { userId: req.tokenData.userId } },
//       {
//         $project: {
//           _id: 1,
//           catalogName: 1,
//           chats: 1,
//         },
//       },
//     ]);
//     res.send(catalogs);
//   } catch (err) {
//     next(err);
//   }
// };
