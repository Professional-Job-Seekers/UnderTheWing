'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {}
  Mentor.init({
    mentor_headline: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,
    underscored: true,
    createdAt: true,
    modelName: 'Mentor',
  });
  Mentor.associate = (models) => {
    models.Mentor.hasMany(models.Mentee);
    models.Mentor.belongsTo(models.Account,
      { 
        foreignKey: {
          unique: true,
          name: "mentor_account_id", 
          allowNull: false 
        }, 
        onDelete: 'CASCADE' 
      });   
    };
  return Mentor;
};