const { Model } = require('sequelize');
const db = require('../../../models');
const { ActivePathway, ActivePathwayTask, Pathway, PathwayTask} = db;

/***************************************************************************************************
 **************************************** Progress Getters *****************************************
 ***************************************************************************************************/

async function getUserPathwayTasks(userId, pathwayId) {
  try {
    const activePathway = await getActivePathwayFromPathwayAndUser(userId, pathwayId);
    const activePathwayTasks = await getAllActivePathwayTasks(userId, activePathway.id);
    return await composeTasksFromActiveTasks(activePathwayTasks);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getActivePathwayTask(userId, activeTaskId) {
  try {
    const activePathwayTask = await ActivePathwayTask.findOne({
      where: {
        "id": activeTaskId,
        "account_id": userId
      }
    }
    );
    if (activePathwayTask === null) { return null };
    const pathwayTask = await Pathway.findOne({
      where: {
        "id": activePathwayTask.pathway_task_id
      }
    });
    return {
      "active_task": activePathwayTask,
      "task": pathwayTask
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getAllActiveUserPathwaysAndTasks(userId) {
  try {
    const allActivePathways = await getAllActivePathwaysForUser(userId);
    return await Promise.all(allActivePathways.map(async function (activePathway) {
      return {
        "pathway": (await Pathway.findByPk(activePathway.pathway_id)).title,
        "tasks": await getAllActivePathwayTasks(userId, activePathway.id)
      }
    }));
  } catch (err) {
    console.log(err);
    return null;
  }
}

/***************************************************************************************************
 **************************************** Progress Mutators ****************************************
 ***************************************************************************************************/

async function updateActiveTaskStatus(taskId, newStatus, submission) {
  try {
    const activeTask = await ActivePathwayTask.findByPk(taskId);
    activeTask.status = newStatus;
    activeTask.submission = submission;
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

/***************************************************************************************************
 ***************************************** Helper/Private ******************************************
 ***************************************************************************************************/

async function getActivePathwayFromPathwayAndUser(userId, pathwayId) {
  return await ActivePathway.findOne({
    where: {
      "account_id": userId,
      "pathway_id": pathwayId,
    },
  });
}

async function getAllActivePathwayTasks(userId, activePathwayId) {
  const activePathwayTasks = await ActivePathwayTask.findAll({
    where: {
      "active_pathway_id": activePathwayId,
      "account_id": userId
    }
  });
  return await Promise.all(activePathwayTasks.map(async function (activeTask) {
    const pathwayTask = await PathwayTask.findByPk(activeTask.pathway_task_id);
    return {
      "id": activeTask.id,
      "status": activeTask.status,
      "title": pathwayTask.title,
      "description": pathwayTask.description,
    }
  }));
}

async function composeTasksFromActiveTasks(activePathwayTasks) {
  return await Promise.all(activePathwayTasks.map(async function (activeTask) {
    let task = await activeTask.getPathwayTask();
    task.dataValues.status = activeTask.status;
    task.id = activeTask.id;
    return task;
  }));
}

async function getAllActivePathwaysForUser(userId) {
  return await ActivePathway.findAll({
    where: {
      "account_id": userId
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