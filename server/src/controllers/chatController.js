const createError = require('http-errors');
const _ = require('lodash');
const { User } = require('../models');
const { Message, Conversation } = require('../models/mongo');

module.exports.getChat = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const participants = [req.tokenData.userId, Number(id)];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const messages = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      { $match: { 'conversationData.participants': participants } },
      { $sort: { createdAt: 1 } },
      {
        $project: {
          _id: 1,
          sender: 1,
          body: 1,
          conversation: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    // const interlocutor = await userQueries.findUser({
    //   id: Number(id),
    // });
    res.send({
      data: {
        messages,
        // interlocutor: {
        //   firstName: interlocutor.firstName,
        //   lastName: interlocutor.lastName,
        //   displayName: interlocutor.displayName,
        //   id: interlocutor.id,
        //   avatar: interlocutor.avatar,
        // },
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
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: '$conversationData._id',
          sender: { $first: '$sender' },
          body: { $first: '$body' },
          createdAt: { $first: '$createdAt' },
          participants: { $first: '$conversationData.participants' },
          blackList: { $first: '$conversationData.blackList' },
          favoriteList: { $first: '$conversationData.favoriteList' },
        },
      },
    ]);
    const interlocutors = [];
    conversations.forEach(conversation => {
      conversation.isTyping = false
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
      attributes: ['id', 'login', 'email', 'avatar'],
    });
    conversations.forEach(conversation => {
      senders.forEach(sender => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            login: sender.dataValues.login,
            email: sender.dataValues.email,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });
    res.send({ data: { conversations } });
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
