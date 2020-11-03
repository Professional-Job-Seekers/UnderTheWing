const express = require('express');
const router = express.Router();
const accountQueries = require('./queries');

/***************************************************************************************************
 ******************************************* Re-Routing ********************************************
 ***************************************************************************************************/

const loginController = require('./logins.js');
router.use('/logins', loginController);

const menteeController = require('../mentees/mentees.js');
router.use('/mentee', menteeController);

const mentorController = require('../mentors/mentors.js');
router.use('/mentor', mentorController);

/***************************************************************************************************
 ***************************************** Account Routing *****************************************
 ***************************************************************************************************/

 router.get('/', (req,res) => {
    res.send(201);
});

router.post('/user-account/', async (req, res) => {
	const password = req.body.password;
	let new_user;
	let user = {
		"first_name": req.body.first_name,
		"last_name": req.body.last_name,
		"username": req.body.username,
		"email": req.body.email
	};
    try {
    	new_user = await accountQueries.createUser(user, password);
		if(new_user){
			res.status(200).json(new_user);
		} else{
			res.sendStatus(500);
		}
	} catch (err) {
        console.log(err);
		res.sendStatus(500);
	}
});


router.get('/user/', async (req, res) => {
	const username = req.query.username; 
	let user = null;
	try{
		user = await accountQueries.findUser(username);
		console.log(user);
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