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
    indexes: [
      {
        unique: true,
        fields: ['pathway_id', 'account_id'],
      }
    ],
    sequelize,
    modelName: 'ActivePathway'
});

  ActivePathway.associate = (models) => {
		models.ActivePathway.belongsTo(models.Pathway, {
      foreignKey: { 
        name: "pathway_id",
        field: "pathway_id",
        allowNull: false 
      }
    });
		models.ActivePathway.belongsTo(models.Account, {
      foreignKey: { 
        name: "account_id",
        field: "account_id",
        allowNull: false 
      }
    });
  };

  return ActivePathway;
};

