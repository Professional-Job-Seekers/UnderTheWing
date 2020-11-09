const express = require('express');
const router = express.Router();
const pathwayQueries = require('../queries');
const commitQueries = require('./queries');
const accountQueries = require('../../accounts/queries');


router.post('/', async (req, res) => {
  const pathway = req.body.pathway;
  const user =  req.user || await accountQueries.findUser(req.body.username);


});


module.exports = router;