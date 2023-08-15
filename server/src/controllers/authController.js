const { UniqueConstraintError } = require('sequelize');
const createError = require('http-errors');
const { User, RefreshToken } = require('../models');
const AuthService = require('../services/authService');

module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      next(createError(401, 'Wrong email'));
      return;
    }
    if (user && (await user.comparePassword(password))) {
      const data = await AuthService.createSession(user);
      return res.status(201).send({
        data,
      });
    }
    next(createError(401, 'Wrong password'));
  } catch (error) {
    next(error);
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    if (user) {
      const data = await AuthService.createSession(user);
      return res.status(201).send({
        data,
      });
    }
    next(createError(400, 'Bad request'));
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
module.exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    const refreshTokenInstance = await RefreshToken.findOne({
      where: { value: refreshToken },
    });
    if (refreshTokenInstance) {
      const data = await AuthService.refreshSession(refreshTokenInstance);
      return res.status(200).send({
        data,
      });
    }
    next(createError(404, 'Token not found'));
  } catch (error) {
    next(error);
  }
};
