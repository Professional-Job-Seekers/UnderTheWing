const db = require('../../models');
const { Account } = db;
const { sequelize } = require('../../models');
const { Op } = require("sequelize");
const { Login } = db;
const bcrypt = require('bcryptjs');

async function findUser(username){
	try{
		const user = await Account.findOne({ 
			where: { 
				[Op.or]: [
					{ "email": username },
					{ "username": username } 
				]} 
			});
		return user;
	} catch(err){
        console.log("DB Query Error: querying for:\t", username );
        console.log(err);
		return null; 
	}
}

async function createUser(user, password, saltRounds=10){
    let new_user = null;
    try {
        const result = await sequelize.transaction(async (txn) => {
			new_user = await Account.create(user, { transaction: txn });
			hashedPassword = await bcrypt.hash(password, saltRounds);
			Login.create({
				"AccountId": new_user.id,
				"password_hash": hashedPassword,
			});
		});
		return new_user;
	} catch (err) {
        console.log(err);
		return null;
	}

}

module.exports.findUser = findUser;
module.exports.createUser = createUser;