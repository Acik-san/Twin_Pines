const JwtService = require('./jwtService');
const prepareUser = require('../utils/prepareUser');
const { MAX_DEVICE_AMOUNT } = require('../constants');

module.exports.createSession = async user => {
  const tokenPair = await JwtService.createTokenPair(user);
  if ((await user.countRefreshTokens()) >= MAX_DEVICE_AMOUNT) {
    const [oldestToken] = await user.getRefreshTokens({
      order: [['updated_at', 'ASC']],
    });
    await oldestToken.update({ value: tokenPair.refresh });
  } else {
    await user.createRefreshToken({
      value: tokenPair.refresh,
    });
  }
  return { user: prepareUser(user), tokenPair };
};
module.exports.refreshSession = async refreshToken => {
  const user = await refreshToken.getUser();
  const tokenPair = await JwtService.createTokenPair(user);
  await refreshToken.update({ value: tokenPair.refresh });
  return { user: prepareUser(user), tokenPair };
};
