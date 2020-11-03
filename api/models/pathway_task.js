'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
	class PathwayTask extends Model {}
	PathwayTask.init({
		title: {
    	type: DataTypes.STRING,
		},
  },
  {
    sequelize,
    modelName: 'PathwayTask'
});

  PathwayTask.associate = (models) => {
    // associations can be defined here
  };

  return PathwayTask;
};