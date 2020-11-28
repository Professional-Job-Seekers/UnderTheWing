const db = require('../../models');
const { Mentor, Account } = db;

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

async function getAllMentors(){
    try {
        const mentors = await Mentor.findAll({
            include: {model: Account}
        });
        return mentors;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports.isMentor = isMentor;
module.exports.setAsMentor = setAsMentor;
module.exports.getAllMentors = getAllMentors;