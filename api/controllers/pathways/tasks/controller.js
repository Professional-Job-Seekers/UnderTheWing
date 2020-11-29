const express = require('express');
const taskQueries = require("./queries");
const router = express.Router();

router.post('/category/create', async (req, res) => {
    try {
        const taskCategory = req.body.category;
        console.log(taskCategory);
        const createdCategory = await taskQueries.createTaskCategory(taskCategory);
        res.status(200).json(createdCategory);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
 });

router.get('/category/all', async (req, res) => {
    try {
        const categories = await taskQueries.getAllTaskCategories();
        res.status(200).json(categories);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
 });

 module.exports = router;