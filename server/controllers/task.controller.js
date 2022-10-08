const createError = require("http-errors");
const { Task } = require("../models");

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, instanceUser } = req;
    const createdTask = await instanceUser.createTask(body);
    res.status(201).send({ data: createdTask });
  } catch (error) {
    next(error);
  }
};
module.exports.getTasks = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const tasks = await Task.findAll({...pagination});
    res.status(201).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};
module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { instanceUser } = req;
    const tasks = await instanceUser.getTasks();
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};
module.exports.getUserTask = async (req, res, next) => {
  try {
    const { instanceTask } = req;
    const task = instanceTask;
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
module.exports.updateTask = async (req, res, next) => {
  try {
    const { instanceTask, body } = req;
    const updatedTask = await instanceTask.update(body);
    res.status(200).send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteTask = async (req, res, next) => {
  try {
    const { instanceTask } = req;
    await instanceTask.destroy();
    res.status(200).send({ data: instanceTask });
  } catch (error) {
    next(error);
  }
};
