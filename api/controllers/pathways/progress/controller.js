const express = require('express');
const router = express.Router();
const pathwayQueries = require('../queries');
const passport = require('../../../middlewares/authentication');
const progressQueries = require('./queries');

router.use(passport.isAuthenticated());


router.get('/', async (req, res, next) => {
    if (req.query.scope === "all"){
        return next();
    }
    try {
        const pathway = await pathwayQueries.getPathway(req.query.pathway);
        const user =  req.user;
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
        const user =  req.user;
        const response = await progressQueries.getAllActiveUserPathwaysAndTasks(user.id);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/active-task', async (req, res) =>{
    try {
        const response = await progressQueries.getActivePathwayTask(req.user.id, req.query.task_id);
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
        const activeTaskId = Number(req.body.task_id);
        if (!Number.isSafeInteger(activeTaskId) || activeTaskId < 1) {
            return res.status(400).json({ msg: 'Invalid task ID' });
        }
        const submission = req.body.submission;
        const newStatus =  "completed";
        const response = await progressQueries.updateActiveTaskStatus(req.user.id, activeTaskId, newStatus, submission);
        if (!response) return res.status(404).json({ msg: 'Task not found' });
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
 });

module.exports = router;