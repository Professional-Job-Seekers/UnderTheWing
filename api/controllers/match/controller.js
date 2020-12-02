const express = require('express');
const router = express.Router();
const matchQueries = require('./queries');

router.get('/', async (req, res) => {
  try {
    const scope = req.query.scope || "mentees";
    const user = req.user || req.query.username;
    let matches = {}
    if(scope === "mentors"){
      matches = await matchQueries.getAllMenteesForMentor(user);
    } else {
      matches = await matchQueries.getAllMentorsForMentee(user);
    }
    res.status(200).json(matches);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});




router.post('/match', async (req, res) => {
  try {
    const sourceUser = req.body.mentee;
    const targetUser = req.body.mentor;
    const match = await matchQueries.matchUsers(sourceUser, targetUser);
    res.status(200).json(match);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


module.exports = router;