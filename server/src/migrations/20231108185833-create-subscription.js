'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('subscriptions', {
      subscriberId: {
        field: 'subscriber_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: { tableName: 'users' },
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'restrict',
      },
      targetId: {
        field: 'target_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: { tableName: 'users' },
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'restrict',
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
    await queryInterface.dropTable('subscriptions');
  },
};
