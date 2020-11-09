const db = require('../../../models');
const {ActivePathway} = db;
const {ActivePathwayTask} = db;
const pathwayQueries = require('../queries');

async function commitUserToPathway(userId, pathwayId){
  try{
    const activePathway = await ActivePathway.create({
      "account_id": userId,     
      "pathway_id": pathwayId,
    });
    await createActivePathwayTasks(userId, pathwayId);
    return {
      "active_pathway" : activePathway,
    };
  } catch(err){
      console.log(err);
      return null;
  }
}

async function createActivePathwayTasks(userId, pathwayId){
  try {
    const tasks = await pathwayQueries.getPathwayTasks(pathwayId);
    const activeTaskListJob = tasks.map( function (task) {
      return { 
        "pathway_task_id" : task.id,
        "account_id" : userId
      }
    });
    return await ActivePathwayTask.bulkCreate(activeTaskListJob);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports.commitUserToPathway = commitUserToPathway; 