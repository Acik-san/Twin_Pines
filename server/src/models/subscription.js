'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {}
  Subscription.init(
    {
      subscriberId: {
        field: 'subscriber_id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      targetId: {
        field: 'target_id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Subscription',
      underscored: true,
      tableName: 'subscriptions',
      timestamps: true,
    }
  );
  return Subscription;
};
