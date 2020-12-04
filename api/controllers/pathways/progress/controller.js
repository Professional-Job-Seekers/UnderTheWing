const express = require('express');
const router = express.Router();
const pathwayQueries = require('../queries');
const accountQueries = require('../../accounts/queries');
const progressQueries = require('./queries');


router.get('/', async (req, res, next) => {
    if (req.query.scope === "all"){
        return next();
    }
    try {
        const pathway = await pathwayQueries.getPathway(req.query.pathway);
        const user =  req.user || await accountQueries.findUser(req.query.username);
        const tasks = await progressQueries.getUserPathwayTasks(user.id, pathway.id);
        res.status(200).json({
            "pathway_id": pathway.id,
            "pathway": pathway.title,
            "tasks": tasks
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/', async (req, res) =>{
    try {
        const user =  req.user || await accountQueries.findUser(req.query.username);
        const response = await progressQueries.getAllActiveUserPathwaysAndTasks(user.id);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/active-task', async (req, res) =>{
    try {
        const response = await progressQueries.getActivePathwayTask(req.query.task_id);
        console.log(response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


/***************************************************************************************************
 ********************************************* Update **********************************************
 ***************************************************************************************************/

 router.post('/update', async (req, res) => {
    try {
        const activeTaskId = req.body.task_id;
        const submission = req.body.submission;
        const newStatus =  "completed";
        const response = await progressQueries.updateActiveTaskStatus(activeTaskId, newStatus, submission);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
 });

module.exports = router;