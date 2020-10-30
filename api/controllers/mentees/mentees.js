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
    const is_mentee = exists == 1;
    let response = {
        "status": 200, 
        "is_mentee": is_mentee    
    };
    res.json(response); 
});


/*
* Define a user as a mentee. 
*/

router.post('/', async (req, res) =>{

});


module.exports = router;