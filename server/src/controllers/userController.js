const createError = require('http-errors');
const { UniqueConstraintError } = require('sequelize');
const _ = require('lodash');
const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    if (req.file) {
      body.avatar = req.file.filename;
    }
    const values = _.pick(body, ['login', 'password', 'avatar']);
    const createdUser = await User.create(values);
    if (!createdUser) {
      next(createError(400, 'Invalid data'));
    }
    const userPrepare = _.omit(await createdUser.get(), ['password']);
    res.status(201).send({ data: userPrepare });
  } catch (error) {
    next(error);
  }
};
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
    const user = await instanceUser.get();
    user.password = undefined;
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};
module.exports.updateUser = async (req, res, next) => {
  try {
    const { instanceUser, body } = req;
    if (req.file) {
      body.avatar = req.file.filename;
    }
    const values = _.pick(body, ['login', 'email', 'password', 'avatar']);
    const updatedUser = await instanceUser.update(values);
    const userPrepare = _.omit(await updatedUser.get(), ['password']);
    res.status(200).send({ data: userPrepare });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      next(createError(409, 'Login or email are already used'));
      return;
    }
    next(error);
  }
};
