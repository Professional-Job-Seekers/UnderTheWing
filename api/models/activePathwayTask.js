'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
	class ActivePathwayTask extends Model {}
	ActivePathwayTask.init({
    status: {
      type: DataTypes.ENUM('completed','skipped','under_review', 'pending_start', 'pending_review', 'in_progress'),
      defaultValue: 'pending_start',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ActivePathwayTask'
});

  ActivePathwayTask.associate = (models) => {
		models.Pathway.hasOne(models.PathwayTask);
		models.Pathway.hasOne(models.Account);
  };

  return ActivePathwayTask;
};

