const express = require('express');
const router = express.Router();
const pathwayQueries = require('../queries');
const accountQueries = require('../../accounts/queries');
const commitQueries = require('./queries');


router.post('/', async (req, res) => {
  let activePathway = null;
  try{
    const user =  req.user || await accountQueries.findUser(req.body.username);
    const pathway = await pathwayQueries.getPathway(req.body.pathway);
    if(await commitQueries.userCommittedToPathway(user.id, pathway.id)){
      res.status(409).json({"msg": "User already committed to pathway"});
    } else {
      activePathway = await commitQueries.commitUserToPathway(user.id, pathway.id);
      res.status(200).json(activePathway);
    }
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }

});


module.exports = router;