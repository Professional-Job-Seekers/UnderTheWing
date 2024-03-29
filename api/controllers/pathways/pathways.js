const express = require('express');
const router = express.Router();
const pathwayQueries = require('./queries');

/***************************************************************************************************
 ******************************************* Re-Routing ********************************************
 ***************************************************************************************************/

const creationController = require('./creation/controller');
const progressController = require('./progress/controller');
const commitController = require('./commit/controller');
const updateController = require('./update/controller');
const taskController = require('./tasks/controller');
router.use('/create', creationController);
router.use('/commit', commitController);
router.use('/update', updateController);
router.use('/progress', progressController);
router.use('/tasks', taskController);


 /**************************************************************************************************
 ***************************************** Pathway Search ******************************************
 ***************************************************************************************************/
router.get('/', async (req, res, next)=>{
  if (req.query.pathway){
    return next();
  } 
  let pathways = null;
  try{
    pathways = await pathwayQueries.getAllPathways();
    if (!pathways){
        res.status(404).json({"msg": "No Pathways Exist !"});
        return;
    }
    res.status(200).json(pathways);
  } catch(err){
      console.log(err);
      res.sendStatus(500);
  }
});


router.get('/', async (req, res)=>{
  const pathway_title = req.query.pathway;
  let pathway = null;
  try{
    pathway = await pathwayQueries.findPathway(pathway_title);
    if (!pathway){
        res.status(404).json({"msg": "Pathway not found !"});
        return;
    }
  } catch(err){
      console.log(err);
      res.sendStatus(500);
  }
  res.status(200).json(pathway);
});



module.exports = router;