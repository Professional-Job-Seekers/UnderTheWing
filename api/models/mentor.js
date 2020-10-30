'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {}
  Mentor.init({
     
  },
  {
    underscored: true,
    sequelize,
  }, 
  {
    sequelize,
    createdAt: true,
    modelName: 'Mentor',
  });

    Mentor.associate = (models) => {
        models.Mentor.belongsTo(models.Account,
        { 
            foreignKey: { 
                allowNull: false 
            }, 
            onDelete: 'CASCADE' 
        });   
    };

    Mentor.associate = (models) => {
        models.Mentor.hasMany(models.Mentee)
    };

  return Mentor;
  
};