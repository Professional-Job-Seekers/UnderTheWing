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
    submission: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['pathway_task_id', 'account_id'],
      }
    ],
    sequelize,
    modelName: 'ActivePathwayTask'
});

  ActivePathwayTask.associate = (models) => {
		models.ActivePathwayTask.belongsTo(models.PathwayTask,{
      foreignKey: { 
        name: "pathway_task_id",
        field: "pathway_task_id",
        allowNull: false 
      }
    });
    models.ActivePathwayTask.belongsTo(models.ActivePathway, {
      foreignKey: {
        name: "active_pathway_id",
        field: "active_pathway_id",
        allowNull: false 
      }
    });
		models.ActivePathwayTask.belongsTo(models.Account,{
      foreignKey: { 
        name: "account_id",
        field: "account_id",
        allowNull: false 
      }
    });
  };

  return ActivePathwayTask;
};

