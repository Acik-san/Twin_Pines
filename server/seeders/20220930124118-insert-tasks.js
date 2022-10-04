"use strict";
const _ = require("lodash");
const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll();
    const tasks = users
      .map((u) => {
        return new Array(_.random(5, 20, false)).fill(null).map((t, i) => ({
          user_id: u.id,
          content: `task number_${i} for user ${u.login}`,
          is_done: _.random(0, 1, true) > 0.7,
          dead_line: new Date("2023-10-10 10:10:10"),
          created_at: new Date(),
          updated_at: new Date(),
        }));
      })
      .flat(2);
    await queryInterface.bulkInsert("tasks", tasks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
