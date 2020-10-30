'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Mentee extends Model {}
  Mentee.init({
    
  }, 
  {
    sequelize,
    createdAt: true,
    modelName: 'Mentee',
  });

  Mentee.associate = (models) => {
      models.Mentee.belongsTo(models.Account,
        { 
            foreignKey: { 
                allowNull: false 
            }, 
            onDelete: 'CASCADE' 
        });
  };
  
  Mentee.associate = (models) => {
    models.Mentee.belongsToMany(models.Mentor, { through: 'Mentoring_Relationship' } )
  };

  return Mentee;
};