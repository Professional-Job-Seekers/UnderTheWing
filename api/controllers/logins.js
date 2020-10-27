const express = require('express');
const router = express.Router();
const db = require('../models');
const { Login } = db;



router.get('/', (req,res) => {
    res.send(200);
});

router.post('/', (req, res) => {


});


router.get('/:id', (req, res) => {

});


router.put('/:id', (req, res) => {

});


router.delete('/:id', (req, res) => {


});


module.exports = router;