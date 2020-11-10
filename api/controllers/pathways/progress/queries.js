const db = require('../../../models');
const {ActivePathway} = db;
const {ActivePathwayTask} = db;
const {Pathway} = db;


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