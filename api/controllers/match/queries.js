const db = require('../../models');
const { Match } = db;
const { Sequelize } = require('sequelize');
const accountQueries = require("../accounts/queries");



async function matchUsers(mentee, mentor) {
  if (mentee == mentor) {
    return {
      "msg": "Error: Can't match a user with themself!"
    }
  }
  const menteeAccount = await accountQueries.findUser(mentee);
  const mentorAccount = await accountQueries.findUser(mentor);
  const match = await Match.create({
    "mentor_account_id": mentorAccount.id,
    "mentee_account_id": menteeAccount.id,
  });
  return {
    "match": match.id,
    "mentor": mentee,
    "mentee": mentor,
  };
}

async function getAllMentorsForMentee(user) {
  const userAccount = await accountQueries.findUser(user);
  const matches = await Match.findAll({
    attributes: ['mentor_account_id'],
    where: {
      'mentee_account_id': userAccount.id,
    }
  });
  const mentorIds = matches.map(match => match.get('mentor_account_id'));
  const mentors = await db.Account.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: mentorIds
      }
    }
  })
  return {
    "mentee": user,
    "mentors": mentors
  }
}

async function getAllMenteesForMentor(user){
  const userAccount = await accountQueries.findUser(user);
  const matches = await Match.findAll({
    attributes: ['mentee_account_id'],
    where: {
      'mentor_account_id': userAccount.id,
    }
  });
  const menteeIds = matches.map(match => match.get('mentee_account_id'));
  const mentees = await db.Account.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: menteeIds
      }
    }
  })
  return {
    "mentor": user,
    "mentees": mentees
  }
}

module.exports.matchUsers = matchUsers;
module.exports.getAllMenteesForMentor = getAllMenteesForMentor;
module.exports.getAllMentorsForMentee = getAllMentorsForMentee;