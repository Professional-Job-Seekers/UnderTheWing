const router = require('express').Router();
const accountQueries = require('./accounts/queries');
const passport = require('../middlewares/authentication');


router.post('/signup', async (req, res) => {
	const password = req.body.password;
	let user = {
        "first_name": req.body.first_name,
		"last_name": req.body.last_name,
		"username": req.body.username,
		"email": req.body.email
	};
    let new_user = null;
    try {
    	new_user = await accountQueries.createUser(user, password);
		if(new_user){
            req.login(user, () => res.status(201).json(user));
		} else{
			res.sendStatus(500);
		}
	} catch (err) {
        console.log(err);
        res.status(400).json({ msg: 'Failed Signup', err });
    }
    return;
});


router.post('/login', passport.authenticate('local', 
  { 
	successRedirect: '/',
	failureRedirect: '/login',
  })
);

router.post('/logout', async (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});




module.exports = router; 