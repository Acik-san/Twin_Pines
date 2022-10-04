const createError = require("http-errors");
const { Task } = require("../models");

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const instanceTask = await Task.findByPk(taskId);
    if (!instanceTask) {
      next(createError(404, "Task not found!"));
    }
    req.instanceTask = instanceTask;
    next();
  } catch (error) {
    next(error);
  }
};
