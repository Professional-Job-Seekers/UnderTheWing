'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
	class ActivePathway extends Model {}
	ActivePathway.init({
    status: {
      type: DataTypes.ENUM('completed', 'pending_start', 'in_progress'),
      defaultValue: 'pending_start',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ActivePathway'
});

  ActivePathway.associate = (models) => {
		models.Pathway.hasOne(models.Pathway);
		models.Pathway.hasOne(models.Account);
  };

  return ActivePathway;
};

