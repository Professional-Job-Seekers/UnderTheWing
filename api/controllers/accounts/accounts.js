const express = require('express');
const { sequelize } = require('../../models');
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
				"userId": new_user.Id,
				"password_hash": hashedPassword,
			});
		});
		res.json(new_user);
	} catch (err) {
        console.log(err);
		res.send(500);}
});




router.get('/:id', (req, res) => {

});


router.put('/:id', (req, res) => {

});


router.delete('/:id', (req, res) => {


});


module.exports = router;