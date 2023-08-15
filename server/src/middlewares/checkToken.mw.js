const createError = require('http-errors');
const userQueries = require('../controllers/queries/userQueries');
const JwtService = require('../services/jwtService');

module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    if (authorization) {
      const [, token] = authorization.split(' ');
      const tokenData = await JwtService.verifyAccessToken(token);
      const foundUser = await userQueries.findUser({ id: tokenData.userId });
      foundUser.password = undefined;
      return res.send({ data: { user: foundUser } });
    }
    next(createError(408, 'Need token'));
  } catch (err) {
    next(err);
  }
};
