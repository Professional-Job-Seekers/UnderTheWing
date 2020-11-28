'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
	class PathwayTask extends Model {}
	PathwayTask.init({
		title: {
      type: DataTypes.STRING,
    },
    sequence : {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    requires_review :{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
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
    models.PathwayTask.hasMany(models.TaskCategory,{});
  };

  return PathwayTask;
};