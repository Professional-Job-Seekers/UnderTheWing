const express = require('express');
const { sequelize } = require('../../models');
const { Op } = require("sequelize");
const router = express.Router();
const db = require('../../models');
var bcrypt = require('bcryptjs');
const { Account } = db;
const { Login } = db;

/*
* User login validation logic.
*/
const loginController = require('./logins.js');
router.use('/logins', loginController);

router.get('/', (req,res) => {
    res.send(201);
});

router.post('/user-account/', async (req, res) => {
	const saltRounds = 10;
	let new_user, hashedPassword;
	let postParams  = req.body;
	let password = req.body["password"];
	let user = {
		"first_name": postParams['first_name'],
		"last_name": postParams['last_name'],
		"username": postParams['username'],
		"email": postParams['email']
	};
    try {
    	const result = await sequelize.transaction(async (txn) => {
			new_user = await Account.create(user, { transaction: txn });
			hashedPassword = await bcrypt.hash(password, saltRounds);
			Login.create({
				"AccountId": new_user.id,
				"password_hash": hashedPassword,
			});
		});
		res.json(new_user);
	} catch (err) {
        console.log(err);
		res.send(500);}
});



router.get('/user/', async (req, res) => {
	const username = req.query.username; 
	console.log(username);
	try{
		const user = await Account.findOne({ 
			where: { 
				[Op.or]: [
					{ "email": username },
					{ "username": username } 
				]} 
			});
		res.json(user);
	} catch(err){
		console.log(err);
		res.sendStatus(404);
	}
});



module.exports = router;