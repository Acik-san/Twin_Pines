"use strict";

const generateUser = (key) => ({
  login: `username${key}`,
  password_hash: "123456",
  created_at: new Date(),
  updated_at: new Date(),
});
const generateUsers = (amount) => {
  return new Array(amount).fill(null).map((u, i) => generateUser(i));
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", generateUsers(20), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
