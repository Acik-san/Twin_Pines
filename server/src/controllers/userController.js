const { UniqueConstraintError } = require('sequelize');
const createError = require('http-errors');
const _ = require('lodash');
const { User } = require('../models');

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
module.exports.updateUser = async (req, res, next) => {
  try {
    const { instanceUser, body } = req;
    if (req.file) {
      body.avatar = req.file.filename;
    }
    const values = _.pick(body, ['login', 'email', 'password', 'avatar']);
    const updatedUser = await instanceUser.update(values);
    const userPrepare = _.omit(updatedUser.dataValues, ['password']);
    res.status(200).send({ data: userPrepare });
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
