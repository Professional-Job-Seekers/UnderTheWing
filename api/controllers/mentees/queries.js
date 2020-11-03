const db = require('../../models');
const { Mentee } = db;

async function isMentee(userId){
    let user = null;
    try {
        user = await Mentee.findOne({
            where:{
                "mentee_account_id": userId,
            }
        });
    } catch(err){
        console.log(err);
        return null;
    }
    return user != null;
}

async function setAsMentee(userId){
    const user = {
        "mentee_account_id": userId
    };
    let mentee = null;
    try{
        mentee = Mentee.create(user);
    } catch(err){
        console.log(err);
        return null; 
    }
    return mentee; 
}

module.exports.isMentee = isMentee;
module.exports.setAsMentee = setAsMentee;