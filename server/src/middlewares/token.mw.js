const httpError = require('http-errors');
const JwtService = require('../services/jwtService');

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    if (authorization) {
      const [, token] = authorization.split(' ');
      req.tokenData = await JwtService.verifyAccessToken(token);
      return next();
    }
    next(httpError(401, 'Need token'));
  } catch (error) {
    next(httpError(401, 'Need token'));
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    req.tokenData = await JwtService.verifyRefreshToken(refreshToken);
    next();
  } catch (error) {
    next(httpError(419, 'Need refreshtoken'));
  }
};
