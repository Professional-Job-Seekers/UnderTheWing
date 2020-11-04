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
    underscored: true,
    modelName: 'PathwayTask'
});

  PathwayTask.associate = (models) => {
    models.PathwayTask.belongsTo(models.Pathway, {
      foreignKey: { 
        allowNull: false 
      }
    });
    // associations can be defined here
  };

  return PathwayTask;
};