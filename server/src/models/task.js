'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {
      Task.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Task.init(
    {
      content: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { notEmpty: true, notNull: true },
      },
      isDone: {
        field: 'is_done',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      deadLine: {
        field: 'dead_line',
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
      timestamps: true,
    }
  );
  return Task;
};
