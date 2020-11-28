const { Model } = require('sequelize');
const db = require('../../../models');
const { TaskCategory } = db;


async function createTaskCategory(category) {
  try {
    return await TaskCategory.create({
      "category" : category 
    });
  } catch (error) {
    return null;
  }
}

async function getAllTaskCategories() {
  try {
    return await TaskCategory.findAll({});
  } catch (error) {
    return null;
  }
}

module.exports.createTaskCategory = createTaskCategory;
module.exports.getAllTaskCategories = getAllTaskCategories;