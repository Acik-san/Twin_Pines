const httpError = require('http-errors');
const { User, RefreshToken } = require('../models');
const AuthService = require('../services/authService');

module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ where: { email } });
    if (user && (await user.comparePassword(password))) {
      const data = await AuthService.createSession(user);
      return res.status(201).send({
        data,
      });
    }
    next(httpError(401, 'Unauthorized'));
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
    next(httpError(400, 'Bad request'));
  } catch (error) {
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
    const data = await AuthService.refreshSession(refreshTokenInstance);
    res.status(200).send({
      data,
    });
  } catch (error) {
    next(error);
  }
};
