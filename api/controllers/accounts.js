const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();
const db = require('../models');
const { Account } = db;
const { Login } = db;


const loginController = require('./logins.js');
router.use('/logins', loginController);



router.get('/', (req,res) => {
    res.send(200);
});

router.post('/user-account/', async (req, res) => {
    let postParams  = req.body;
    try {
        const result = await sequelize.transaction(async (t) => {
            const account = await Account.create({
                first_name: postParams['first_name'],
                last_name: postParams['last_name'],
                username: postParams['username'],
                email: postParams['email'],
            }, { transaction: t });
            res.status(201).json(account);;
        });
      } catch (err) {
        console.log(err);
        res.send(500);
      }
});


router.get('/:id', (req, res) => {

});


router.put('/:id', (req, res) => {

});


router.delete('/:id', (req, res) => {


});


module.exports = router;