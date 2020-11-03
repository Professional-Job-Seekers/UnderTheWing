'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Mentee extends Model {}
  Mentee.init({}, 
  {
    sequelize,
    underscored: true,
    createdAt: true,
    modelName: 'Mentee',
  });

  Mentee.associate = (models) => {
    models.Mentee.belongsTo(models.Account,{ 
      foreignKey: { 
        unique: true,
        name: "mentee_account_id",
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
    models.Mentee.belongsToMany(models.Mentor, { 
      through: 'Mentoring_Relationship' 
    });
  };
  return Mentee;
};