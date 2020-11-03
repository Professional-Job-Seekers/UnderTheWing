const db = require('../../models');
const { Mentor } = db;

async function isMentor(userId){
    let user = null;
    try {
        user = await Mentor.findOne({
            where:{
                "mentor_account_id": userId,
            }
        });
    } catch(err){
        console.log(err);
        return null;
    }
    return user != null;
}

async function setAsMentor(userId){
    const user = {
        "mentor_account_id": userId
    };
    let mentor = null;
    try{
        mentor = Mentor.create(user);
    } catch(err){
        console.log(err);
        return null; 
    }
    return mentor; 
}

module.exports.isMentor = isMentor;
module.exports.setAsMentor = setAsMentor;