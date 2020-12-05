const express = require('express');
const router = express.Router();
const pathwayQueries = require('../queries');


/***************************************************************************************************
 **************************************** Pathway Creation *****************************************
 ***************************************************************************************************/

router.post('/', async (req, res, next) =>{
  if(req.body.tasks){
    return next();
  }
  const pathway = {
    "title" : req.body.title,
  };
  let new_pathway = null; 
  try{
    new_pathway = await pathwayQueries.createPathway(pathway)
    res.status(200).json(new_pathway);
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res, next) =>{
  if(req.body.categories){
    return next();
  }
  const pathway = {
    "title": req.body.title,
    "description":  req.body.description || ''
  };
  const tasks =  req.body.tasks;
  let newPathway = null; 
  try{
    newPathway = await pathwayQueries.createPathwayWithTasks(pathway, tasks);
    res.status(200).json(newPathway);
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) =>{
  const pathway = {
    "title": req.body.title,
    "categories": req.body.categories,
    "description":  req.body.description || ''
  };
  const tasks =  req.body.tasks;
  let newPathway = null; 
  try{
    newPathway = await pathwayQueries.createPathwayWithTasksAndCategories(pathway, tasks);
    console.log(newPathway);
    res.status(200).json(newPathway);
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }
});


module.exports = router;