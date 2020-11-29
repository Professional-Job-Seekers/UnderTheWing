'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Pathway extends Model {}
	Pathway.init({
		title: {
    	type: DataTypes.STRING,
      unique: true,
      allowNull: false, 
    },		
    description: {
    	type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '', 
		},
  },
  {
    sequelize,
    modelName: 'Pathway'
});
  Pathway.associate = (models) => {
		models.Pathway.hasMany(models.PathwayTask);
		models.Pathway.hasMany(models.PathwayCategory);
  };
  return Pathway;
};

