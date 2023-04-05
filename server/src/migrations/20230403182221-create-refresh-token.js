'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('refresh_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'users' }, key: 'id' },
        onUpdate: 'restrict',
        onDelete: 'cascade',
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ua: {
        type: Sequelize.STRING,
      },
      fingerprint: {
        type: Sequelize.STRING,
      },
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
    await queryInterface.dropTable('refresh_tokens');
  },
};
