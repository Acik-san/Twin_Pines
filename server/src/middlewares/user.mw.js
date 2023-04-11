const createError = require('http-errors');
const { User } = require('../models');

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      // params: { userId },
      tokenData:{userId}
    } = req;
    const instanceUser = await User.findByPk(Number(userId));
    if (!instanceUser) {
      next(createError(404, 'User not found!'));
    }
    req.instanceUser = instanceUser;
    next();
  } catch (error) {
    next(error);
  }
};
