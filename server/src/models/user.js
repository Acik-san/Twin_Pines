'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

async function hashPassword (user, options) {
  if (user.changed('password')) {
    const { password } = user;
    const passwordHashed = await bcrypt.hash(password, SALT_ROUNDS);
    user.password = passwordHashed;
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
      });
      User.belongsToMany(models.User, {
        as: 'Subscriber',
        through: 'subscriptions',
        foreignKey: 'subscriberId',
        otherKey: 'targetId',
      });

      User.belongsToMany(models.User, {
        as: 'Target',
        through: 'subscriptions',
        foreignKey: 'targetId',
        otherKey: 'subscriberId',
      });
    }
    async comparePassword (password) {
      return bcrypt.compare(password, this.getDataValue('password'));
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        field: 'user_name',
        allowNull: false,
        unique: true,
        validate: { notEmpty: true, notNull: true },
      },
      name: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true, notNull: true },
      },
      password: {
        field: 'password_hash',
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
        defaultValue: 'anon.png',
      },
      onlineStatus: {
        field: 'online_status',
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'offline',
      },
      lastSeen: {
        field: 'last_seen',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      bio: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      timestamps: true,
    }
  );

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
