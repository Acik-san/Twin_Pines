const { UniqueConstraintError } = require('sequelize');
const createError = require('http-errors');
const _ = require('lodash');
const { User, Subscription } = require('../models');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
    users.forEach(user => (user.dataValues.status = 'offline'));
    res.status(200).send({ data: { users } });
  } catch (error) {
    next(error);
  }
};
module.exports.getUser = async (req, res, next) => {
  try {
    const { instanceUser } = req;
    const user = _.omit(await instanceUser.get(), ['password']);
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};
module.exports.getUserProfile = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
      params: { userName },
    } = req;
    const userData = await User.findOne({
      where: { userName },
      attributes: {
        exclude: ['email', 'password', 'createdAt', 'updatedAt'],
      },
    });
    const isFollowed = await Subscription.findOne({
      where: { subscriberId: userId, targetId: userData.dataValues.id },
    });
    const followers = await userData.countTarget();
    const following = await userData.countSubscriber();
    res.status(200).send({
      data: {
        userData: {
          ...userData.dataValues,
          followers,
          following,
          isFollowed: isFollowed ? true : false,
        },
      },
    });
  } catch (error) {
    next(createError(404, 'User not found'));
  }
};
module.exports.updateUser = async (req, res, next) => {
  try {
    const { instanceUser, body } = req;
    if (req.file) {
      body.avatar = req.file.filename;
    }
    const value = _.pick(body, [
      'userName',
      'name',
      'email',
      'password',
      'avatar',
    ]);
    if (value.name === '') {
      value.name = null;
    }
    const followers = await instanceUser.countTarget();
    const following = await instanceUser.countSubscriber();
    const updatedUser = await instanceUser.update(value);
    const userPrepare = _.omit(updatedUser.dataValues, ['password']);
    res.status(200).send({ data: { ...userPrepare, followers, following } });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      const fieldName = error.errors[0].path;
      next(
        createError(
          409,
          `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is already used`
        )
      );
      return;
    }
    next(error);
  }
};

module.exports.subscribeUser = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
      params: { targetId },
    } = req;
    await Subscription.create({
      subscriberId: userId,
      targetId,
    });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports.unsubscribeUser = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
      params: { targetId },
    } = req;
    const subscription = await Subscription.findOne({
      where: {
        subscriberId: userId,
        targetId,
      },
    });
    await subscription.destroy();
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports.getUserFollowers = async (req, res, next) => {
  try {
    const {
      params: { userName },
      query: { subscriptionsLimit, subscriptionsOffset },
    } = req;
    const user = await User.findOne({
      where: { userName },
    });
    const followers = await user.getTarget({
      attributes: {
        exclude: [
          'email',
          'onlineStatus',
          'lastSeen',
          'bio',
          'createdAt',
          'updatedAt',
          'password',
        ],
      },
      limit: parseInt(subscriptionsLimit),
      offset: parseInt(subscriptionsOffset),
      joinTableAttributes: [],
    });
    const haveMoreSubscriptions =
      followers.length === parseInt(subscriptionsLimit) ? true : false;
    res.status(200).send({
      data: {
        followers,
        haveMoreSubscriptions,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserFollowing = async (req, res, next) => {
  try {
    const {
      params: { userName },
      query: { subscriptionsLimit, subscriptionsOffset },
    } = req;
    const user = await User.findOne({
      where: { userName },
    });
    const following = await user.getSubscriber({
      attributes: {
        exclude: [
          'email',
          'onlineStatus',
          'lastSeen',
          'bio',
          'createdAt',
          'updatedAt',
          'password',
        ],
      },
      limit: parseInt(subscriptionsLimit),
      offset: parseInt(subscriptionsOffset),
      joinTableAttributes: [],
      // include: [
      //   {
      //     model: User,
      //     as: 'Target',
      //     attributes: [],
      //   },
      // ],
      // order: [
      //   [{ model: User, as: 'Target' }, 'createdAt', 'ASC'],
      // ],
    });
    const haveMoreSubscriptions =
      following.length === parseInt(subscriptionsLimit) ? true : false;
    res.status(200).send({
      data: {
        following,
        haveMoreSubscriptions,
      },
    });
  } catch (error) {
    next(error);
  }
};
