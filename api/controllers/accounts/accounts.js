const express = require('express');
const router = express.Router();
const accountQueries = require('./queries');

/***************************************************************************************************
 ******************************************* Re-Routing ********************************************
 ***************************************************************************************************/

const menteeController = require('../mentees/mentees.js');
router.use('/mentee', menteeController);

const mentorController = require('../mentors/mentors.js');
router.use('/mentor', mentorController);

/***************************************************************************************************
 ***************************************** Account Routing *****************************************
 ***************************************************************************************************/

router.get('/user/', async (req, res) => {
	const username = req.query.username; 
	let user = null;
	try{
		user = await accountQueries.findUser(username);
		if(user){
			res.status(200).json(user);
		} else{
			res.sendStatus(404);
		}
	} catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});



module.exports = router;