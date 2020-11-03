'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
	class Pathway extends Model {}
	Pathway.init({
		title: {
    	type: DataTypes.STRING,
		},
		track: {
    	type: DataTypes.STRING,
		},
  },
  {
    sequelize,
    modelName: 'Pathway'
});

  Pathway.associate = (models) => {
		models.Pathway.hasMany(models.PathwayTask);
    // associations can be defined here
  };

  return Pathway;
};