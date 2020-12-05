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
    const activePathwayTasks = await createActivePathwayTasks(userId, pathwayId, activePathway.id);
    console.log("\n\n\n\n\n\n", activePathwayTasks, "\n\n\n\n\n\n\n" );
    return {
      "active_pathway" : activePathway,
      "activePathwayTasks" : activePathwayTasks
    };
  } catch(err){
      console.log(err);
      return null;
  }
}

async function userCommittedToPathway(userId, pathwayId){
  try{
    const activePathwayRecord = await ActivePathway.findOne({
      where :{
        "account_id": userId,     
        "pathway_id": pathwayId,
      }
    });
    return activePathwayRecord != null;
  } catch(err){
      console.log(err);
      return null;
  }
}

async function createActivePathwayTasks(userId, pathwayId, activePathwayId){
  try {
    const tasks = await pathwayQueries.getPathwayTasks(pathwayId);
    const activeTaskListJob = tasks.map(function (task) {
      return { 
        "pathway_task_id" : task.id,
        "account_id" : userId,
        "active_pathway_id" : activePathwayId
      }
    });
    return await ActivePathwayTask.bulkCreate(activeTaskListJob);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports.commitUserToPathway = commitUserToPathway; 
module.exports.userCommittedToPathway = userCommittedToPathway;