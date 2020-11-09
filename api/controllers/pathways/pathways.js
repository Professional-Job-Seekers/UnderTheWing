const express = require('express');
const router = express.Router();
const pathwayQueries = require('./queries');

/***************************************************************************************************
 ******************************************* Re-Routing ********************************************
 ***************************************************************************************************/

const creationController = require('./creationController');
const progressController = require('./progressController');
const commitController = require('./commitController');
const updateController = require('./updateController');
router.use('/create', creationController);
router.use('/commit', commitController);
router.use('/update', updateController);
router.use('/progress', progressController);


 /***************************************************************************************************
 ***************************************** Pathway Search ******************************************
 ***************************************************************************************************/

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