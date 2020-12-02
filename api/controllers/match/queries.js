const db = require('../../models');
const { Match} = db;
const accountQueries = require("../accounts/queries");



async function matchUsers(sourceUser, targetUser) {
  if (sourceUserUser == targetUser){
    return {
      "msg": "Error: Can't match a user with themself!"
    }
  }
  const menteeAccount = await accountQueries.findUser(sourceUser);
  const mentorAccount = await accountQueries.findUser(targetUser);
  const match = await Match.create({
    "mentor_account_id": mentorAccount.id,
    "mentee_account_id": menteeAccount.id,
  });
  return {
    "match": match.id,
    "mentor": sourceUser,
    "mentee": targetUser,
  };
}

async function getAllUserMatches(user) {
}

module.exports.matchUsers = matchUsers;
module.exports.getAllUserMatches = getAllUserMatches;