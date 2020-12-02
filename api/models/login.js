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
    last_login: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            notEmpty: true,
        }
    },
  }, 
  {
    sequelize,
    createdAt: true,
    modelName: 'Login',
  });
  Login.associate = (models) => {
    Login.belongsTo(models.Account,{
        foreignKey: {
          name: "account_id",
          field: "account_id",
          allowNull: false,
      }
    });
  };

  return Login;
};