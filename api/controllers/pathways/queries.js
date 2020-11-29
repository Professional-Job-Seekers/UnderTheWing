const { Model } = require('sequelize');
const db = require('../../models');
const { Pathway } = db;
const { PathwayTask } = db;

/***************************************************************************************************
 ******************************************** Searching ********************************************
 ***************************************************************************************************/

async function getAllPathways(){
  let pathways = "";
  try {
    pathways = await Pathway.findAll();
    return pathways;
  } catch(err){
    console.log(err);
    return null;
  }
}

 async function getPathway(pathwayTitle){
  let pathway = "";
  try {
    pathway = await Pathway.findOne({
      where : {
        "title": pathwayTitle
      }
    });
  } catch(err){
    console.log(err);
    return null;
  }
  return pathway;
}

async function getPathwayTasks(pathwayId){
  let tasks = null;
  try {
    tasks = await PathwayTask.findAll({
      where  : {
        "pathway_id" : pathwayId
      }
    });
  } catch(err){
    console.log(err);
    return null;
  }
  return tasks;
}



async function findPathway(pathway_title){
  let pathway = "", tasks = [];
  try {
    pathway = await Pathway.findOne({
      where : {
        "title": pathway_title
      }
    });
    tasks = await PathwayTask.findAll({
      where  : {
        pathway_id : pathway.id
      }
    });
  } catch(err){
    console.log(err);
    return null;
  }
  const response = {
    "pathway" : {
      id: pathway.id, 
      title: pathway.title, 
      tasks :  tasks
    } ,
  };
  return response;
}

async function findPathwaysByCategory(){

  
}


async function getUserPathwayProgress(){
  

}

/***************************************************************************************************
 ******************************************** Creation *********************************************
 ***************************************************************************************************/

async function createPathway(pathway){
  let newPathway = null; 
  try{
    newPathway = Pathway.create(pathway);
  } catch(err){
    console.log(err);
    return null;
  }
  return newPathway;
}

async function createPathwayWithTasks(pathway, tasks){
  let newPathway = null, newPathwayTasks = null; 
  try{
    newPathway = await Pathway.create(pathway);
    tasks.forEach(task => task.PathwayId = newPathway.id);
    newPathwayTasks = await PathwayTask.bulkCreate(tasks);
  } catch(err){
    console.log(err);
    return null;
  }
  const response = {
    pathway : {
      id: newPathway.id, 
      description: newPathway.description, 
      title: newPathway.title, 
      tasks :  newPathwayTasks
    } ,
  };
  return response;
}

async function createPathwayWithTasksAndCategories(pathway, tasks, categories){
  let newPathway = null, newPathwayTasks = null, newPathwayCategories = null;   
  try{
    newPathway = await Pathway.create({ title : pathway});
    newPathwayCategories = await newPathway.addPathwayCategories(categories);
    newPathwayCategories = await newPathway.getPathwayCategories();
    newPathwayCategories = newPathwayCategories.map(categoryJSON => categoryJSON.category);
    tasks.forEach(task => task.PathwayId = newPathway.id);
    newPathwayTasks = await PathwayTask.bulkCreate(tasks);
  } catch(err){
    console.log(err);
    return null;
  }
  const response = {
    pathway : {
      id: newPathway.id, 
      title: newPathway.title,
      categories: newPathwayCategories,
      tasks :  newPathwayTasks
    } ,
  };
  return response;
}


/***************************************************************************************************
 ********************************************* Update **********************************************
 ***************************************************************************************************/

async function addPathwayTask(){
  

}

async function updatePathwayProgress(){

}


/***************************************************************************************************
 ********************************************* Exports *********************************************
 ***************************************************************************************************/

module.exports.addPathwayTask = addPathwayTask;
module.exports.createPathway = createPathway;
module.exports.updatePathwayProgress = updatePathwayProgress;
module.exports.findPathway = findPathway;
module.exports.getAllPathways = getAllPathways;
module.exports.getPathway = getPathway;
module.exports.getPathwayTasks = getPathwayTasks;
module.exports.createPathwayWithTasks = createPathwayWithTasks;
module.exports.createPathwayWithTasksAndCategories = createPathwayWithTasksAndCategories;