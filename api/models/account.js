'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Account extends Model {}
  Account.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        valdiate: {
            notEmpty: true,
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
  }, 
  {
    sequelize,
    createdAt: true,
    modelName: 'post',
  },
  {
    indexes: [
        {
            unique: true,
            fields: ['username', 'email']
        }
    ]
  });

  Account.associate = (models) => {
    // associations can be defined here
  };

  return Account;
};