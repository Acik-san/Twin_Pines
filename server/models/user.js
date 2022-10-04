"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      login: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: { notEmpty: true, notNull: true },
      },
      password: {
        field: "password_hash",
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
        set() {
          this.setDataValue("password", "hash");
        },
      },
      avatar: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
