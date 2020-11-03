const express = require('express');
const router = express.Router();
const accountQueries = require('../accounts/queries');
const menteeQueries = require('./queries');

/*
* Return whether a user is a Mentee or Not.
*/

router.get('/', async (req, res)=>{
    let exists = 0, user = null;
    const username = req.query.username;
    try{
        user = await accountQueries.findUser(username);
        exists = await menteeQueries.isMentee(user.id);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    let response = {
        "status": 200, 
        "is_mentee": exists    
    };
    res.json(response); 
});


/*
* Define a user as a mentee. 
*/

router.post('/', async (req, res) =>{
    const username = req.body.username;
    let user = null, mentee = null, exists = null;
    try{
        user = await accountQueries.findUser(username);
        mentee = await menteeQueries.setAsMentee(user.id);
        exists = mentee != null;
    }catch(err){
        console.log(err);
        res.sendStatus(500);
        return;
    }
    console.log(mentee);
    res.status(200).json({
        "is_mentee": exists    
    });
});


module.exports = router;