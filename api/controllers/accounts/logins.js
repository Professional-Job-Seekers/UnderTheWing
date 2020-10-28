const express = require('express');
const { sequelize } = require('../../models');
const router = express.Router();
const { Op } = require("sequelize");
const db = require('../../models');
var bcrypt = require('bcryptjs');
const { Account } = db;
const { Login } = db;

router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const authTokens = {};
    try {
        const user = await Account.findOne({ 
			where: { 
				[Op.or]: [
					{ "email": username },
					{ "username": username } 
				]} 
			});
        const login = await Login.findOne({
            where:{
                "AccountId":  user.id,
            }
        });
        const isValid = await bcrypt.compare(password, login.password_hash);
        if (isValid){
            // TODO: store auth tokens in Database. 
            res.status(200).json({"status" : 200 ,"msg": "User authenticated!"});
        } else{
            res.sendStatus(404);
        }
	} catch (err) {
        console.log(err);
        res.send(500);
    }
});



module.exports = router;