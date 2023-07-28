const db = require('../../models');
// const NotFound = require('../../errors/UserNotFoundError');
// const ServerError = require('../../errors/ServerError');
const bcrypt = require('bcrypt');

module.exports.updateUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await db.User.update(data, {
    where: { id: userId },
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    // throw new ServerError('cannot update user');
    throw new Error('cannot update user');
  }
  return updatedUser.dataValues;
};

module.exports.findUser = async (predicate, transaction) => {
  const result = await db.User.findOne({ where: predicate, transaction });
  if (!result) {
    // throw new NotFound('user with this data didn`t exist');
    throw new Error('user with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    // throw new NotFound('Wrong password');
    throw new Error('Wrong password');
  }
};
