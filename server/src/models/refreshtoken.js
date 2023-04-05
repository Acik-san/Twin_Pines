'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate (models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  RefreshToken.init(
    {
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ua: DataTypes.STRING,
      fingerprint: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RefreshToken',
      underscored: true,
      tableName: 'refresh_tokens',
      timestamps: true,
    }
  );
  return RefreshToken;
};
