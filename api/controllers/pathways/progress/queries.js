const { Model } = require('sequelize');
const db = require('../../../models');
const {ActivePathway, ActivePathwayTask, Pathway, pathwayTask} = db;

/***************************************************************************************************
 **************************************** Progress Getters *****************************************
 ***************************************************************************************************/

async function getUserPathwayTasks(userId, pathwayId){
    try {
        const activePathway = await getActivePathwayFromPathwayAndUser(userId, pathwayId);
        const activePathwayTasks =  await getAllActivePathwayTasks(activePathway.id);
        return await composeTasksFromActiveTasks(activePathwayTasks);
    } catch (err) {
        console.log(null);
        return null;
    }
}

async function getActivePathwayTask(activeTaskId){
    try {
        const activePathwayTask =  await ActivePathwayTask.findByPk(activeTaskId); 
        const pathwayTask = await activePathwayTask.getPathwayTask();
        return {
            "active_task": activePathwayTask,
            "task": pathwayTask
        } ;
    } catch (error) {
        console.log(error);
        return null;
    }
}


async function getAllActiveUserPathwaysAndTasks(userId){
    try {
        const allActivePathways = await getAllActivePathwaysForUser(userId);
        return await Promise.all(allActivePathways.map(async function (activePathway){
            return {
                "pathway" : (await Pathway.findByPk(activePathway.pathway_id)).title,
                "tasks" :  await composeTasksFromActiveTasks(await getAllActivePathwayTasks(activePathway.id))
            }
        }));
    } catch (err) {
        console.log(null);
        return null;
    }
}

/***************************************************************************************************
 **************************************** Progress Mutators ****************************************
 ***************************************************************************************************/

 async function updateActiveTaskStatus(taskId, newStatus){
    try {
        const activeTask = await ActivePathwayTask.findByPk(taskId);
        activeTask.status = newStatus;
        activeTask.save();
        return {
            "task_id": activeTask.id,
            "status": activeTask.status,
            "msg": "Successfully Updated!"
        };
    } catch (err) {
        console.log(err);
        return null;
    }
 }

 async function textSubmissionForActivePathwayTask(){
     try {
         
     } catch (error) {
         console.log(error);
         return null;
     }
 }


/***************************************************************************************************
 ***************************************** Helper/Private ******************************************
 ***************************************************************************************************/

async function getActivePathwayFromPathwayAndUser(userId, pathwayId){
    return await ActivePathway.findOne({
        where: {
            "account_id" : userId,
            "pathway_id" : pathwayId,
        },
    });
}

async function getAllActivePathwayTasks(activePathwayId){
    return await ActivePathwayTask.findAll({
        where : {
            "active_pathway_id" : activePathwayId
        } 
    });
}

async function composeTasksFromActiveTasks(activePathwayTasks){
    return await Promise.all(activePathwayTasks.map( async function (activeTask) {
        let task = await activeTask.getPathwayTask();
        task.dataValues.status = activeTask.status;
        task.id = activeTask.id;
        return task;
    }));
}

async function getAllActivePathwaysForUser(userId){
    return await ActivePathway.findAll({
        where : { 
            "account_id" : userId
        }
    });
}

 /***************************************************************************************************
 ********************************************* Exports *********************************************
 ***************************************************************************************************/

module.exports.getUserPathwayTasks = getUserPathwayTasks;
module.exports.getAllActiveUserPathwaysAndTasks = getAllActiveUserPathwaysAndTasks;
module.exports.updateActiveTaskStatus = updateActiveTaskStatus;
module.exports.getActivePathwayTask = getActivePathwayTask;