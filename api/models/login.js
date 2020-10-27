'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Login extends Model {}
  Login.init({
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    password_salt: {
        type: DataTypes.STRING,
        allowNull: false,
        valdiate: {
            notEmpty: true,
        }
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    
  }, 
  {
    sequelize,
    createdAt: true,
    modelName: 'Login',
  },
  {
    indexes: [
        {
            unique: true,
            fields: []
        }
    ]
  });

  Login.associate = (models) => {
    // associations can be defined here
  };

  return Login;
};