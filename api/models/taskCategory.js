'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class TaskCategory extends Model {}
	TaskCategory.init({
		category: {
      primaryKey: true,
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'TaskCategory'
  });
  return TaskCategory;
};