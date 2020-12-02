const express = require('express');
const router = express.Router();
const matchQueries = require('./queries');

router.get('/', async (req, res) => {
  try {
    const user = req.user;
    const matches = await matchQueries.getAllUserMatches(user);
    res.status(200).json(matches);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


router.post('/match', async (req, res) => {
  try {
    const sourceUser = req.user || req.body.source_user;
    const targetUser = req.body.target_user;
    const match = await matchQueries.matchUsers(sourceUser, targetUser);
    res.status(200).json(match);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


module.exports = router;