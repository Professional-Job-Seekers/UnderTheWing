const express = require('express');
const router = express.Router();


// Load each controller
const accountController = require('./accounts/accounts.js');
const appConfigController = require('./appConfig.js');
const authController = require('./auth.js');
const pathwayController = require('./pathways/pathways.js');
const matchController = require('./match/controller');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/auth', authController);
router.use('/pathways', pathwayController);
router.use('/accounts', accountController);
router.use('/matches', matchController);
router.use('/application-configuration', appConfigController);



module.exports = router;