const db = require('../../models');
const { Account } = db;
const { sequelize } = require('../../models');
const { Op, Model } = require("sequelize");
const { Login } = db;
const bcrypt = require('bcryptjs');

async function findUser(username) {
  try {
    const user = await Account.findOne({
      where: {
        [Op.or]: [
          { "email": username },
          { "username": username }
        ]
      }
    });
    return user;
  } catch (err) {
    console.log("DB Query Error: querying for:\t", username);
    console.log(err);
    return null;
  }
}

async function createUser(user, password, saltRounds = 10) {
  let new_user = null, hashedPassword = null;
  try {
    await sequelize.transaction(async (txn) => {
      new_user = await Account.create(user, { transaction: txn });
      hashedPassword = await bcrypt.hash(password, saltRounds);
      const login = await Login.create({
        "account_id": new_user.id,
        "password_hash": hashedPassword,
      }, {transaction: txn}
      )
    });
    return new_user;
  } catch (err) {
    console.log(err);
    return null;
  }

}

async function getHashedPassword(userId) {
  let hashedPassword = null;
  try {
    const login = await Login.findOne({
      where : {
        "account_id": userId,
      }
    });
    hashedPassword = login.password_hash;
  } catch (err) {
    console.log(err)
    return null;
  }
  return hashedPassword;
}

async function findUserByPK(userId) {
  let user = null;
  try {
    user = await Account.findByPk(userId);
  } catch (err) {
    console.log(err);
    return null;
  }
  return user;
}

module.exports.findUser = findUser;
module.exports.createUser = createUser;
module.exports.getHashedPassword = getHashedPassword;
module.exports.findUserByPK = findUserByPK;