const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('../models').User;
const accountQueries = require('../controllers/accounts/queries');

/*
* Docs: http://www.passportjs.org/packages/passport-local/
*/

async function passwordsMatch(submittedPassword, storedPasswordHash) {
    return await bcrypt.compare(submittedPassword, storedPasswordHash);
}

async function verifyCallback(username, password, done){
    let user = await accountQueries.findUser(username);    
    if(!user) {
        console.log('\n\nFailed Login: user does not exist\n\n');
        return done(null, false, { message: 'Failed Login' });
    }
    let hashedPassword = await accountQueries.getHashedPassword(user.id);
    if(await passwordsMatch(password, hashedPassword) === false) {
        console.log('\n\nFailed Login: passwords did not match\n\n');
        return done(null, false, { message: 'Failed Login' });
    }
    console.log('\n\nSuccessful Login\n\n');
    return done(null, user, { message: 'Successfully Logged In!' });
}

/*
* Docs: http://www.passportjs.org/docs/configure/
*/

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try{
		let user = await accountQueries.findUserByPK(id);
		if(!user){
			return	done(null, false);
		}
	} catch(err){
    	done(err, user);
  	}
});

// Use this protect api routes that require a user to be logged in.
passport.isAuthenticated = () => 
  (req, res, next) => (req.user ? next() : res.sendStatus(401));


module.exports = passport;