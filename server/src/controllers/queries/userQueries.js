const db = require('../../models');
const createError = require('http-errors');

module.exports.findUser = async (predicate, transaction) => {
  const result = await db.User.findOne({ where: predicate, transaction });
  if (!result) {
    throw createError(404, 'User not found');
  } else {
    return result.get({ plain: true });
  }
};
