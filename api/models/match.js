'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model { }
  Match.init({},
    {
      indexes: [
        {
          unique: true,
          fields: ['mentee_account_id', 'mentor_account_id'],
        }
      ],
      sequelize,
      underscored: true,
      createdAt: true,
      modelName: 'Match',
    });
  Match.associate = (models) => {
    models.Match.belongsTo(models.Account, {
      foreignKey: {
        as: "mentee",
        name: "mentee_account_id",
        field: "mentee_account_id",
        allowNull: false
      },
    });
    models.Match.belongsTo(models.Account,
      {
        as: "mentor",
        foreignKey: {
          name: "mentor_account_id",
          field: "mentor_account_id",
          allowNull: false
        },
      });
  };
  return Match;
};