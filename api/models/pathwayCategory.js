'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PathwayCategory extends Model {}
  PathwayCategory.init({
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
    modelName: 'PathwayCategory'
  });
  return PathwayCategory;
};