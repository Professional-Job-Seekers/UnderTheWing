const express = require('express');
const router = express.Router();


// Load each controller
const postsController = require('./posts.js');
const accountController = require('./accounts/accounts.js');
const menteeController = require('./mentees/mentees.js');
const appConfigController = require('./appConfig.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/posts', postsController);
router.use('/accounts', accountController);
router.use('/mentees', menteeController);
router.use('/application-configuration', appConfigController);


module.exports = router;