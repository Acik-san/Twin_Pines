const bcrypt = require('bcrypt');
const CONSTANTS = require('../constants');

const generateUser = key => ({
  user_name: `user_${key}`,
  email: `user.${key}@gmail.com`,
  password_hash: bcrypt.hashSync(
    '1Qwerty_',
    bcrypt.genSaltSync(CONSTANTS.SALT_ROUNDS)
  ),
});

const generateUsers = amount => {
  return new Array(amount > 50 ? 50 : amount)
    .fill(null)
    .map((e, i) => generateUser(i));
};
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', generateUsers(50), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
