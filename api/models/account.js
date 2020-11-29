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
        unique: true,
        validate: {
            notEmpty: true,
        }
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },

  }, 
  {
    sequelize,
    createdAt: true,
    modelName: 'Account',
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
    models.Account.hasOne(models.Login);
  };

  return Account;
};