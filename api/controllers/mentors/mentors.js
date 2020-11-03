const express = require('express');
const router = express.Router();
const accountQueries = require('../accounts/queries');
const mentorQueries = require('./queries');

router.get('/', async (req, res)=>{
    let exists = 0, user = null;
    const username = req.query.username;
    try{
        user = await accountQueries.findUser(username);
        exists = await mentorQueries.isMentor(user.id);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    let response = {
        "status": 200, 
        "is_mentor": exists    
    };
    res.json(response); 
});

router.post('/', async (req, res) =>{
    const username = req.body.username;
    let user = null, mentor = null, exists = null;
    try{
        user = await accountQueries.findUser(username);
        mentor = await mentorQueries.setAsMentor(user.id);
        exists = mentor != null;
    }catch(err){
        console.log(err);
        res.sendStatus(500);
        return;
    }
    res.status(200).json({
        "is_mentor": exists    
    });
});


module.exports = router;