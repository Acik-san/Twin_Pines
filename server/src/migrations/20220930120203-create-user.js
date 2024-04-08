'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userName: {
        type: Sequelize.STRING,
        field: 'user_name',
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        field: 'password_hash',
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      onlineStatus: {
        field: 'online_status',
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'offline',
      },
      lastSeen: {
        field: 'last_seen',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      bio: { type: Sequelize.STRING },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
