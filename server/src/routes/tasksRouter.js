const { Router } = require("express");
const TaskController = require("../controllers/taskController");
const { paginate } = require("../middlewares/paginate.mw");
const { checkTask } = require("../middlewares/task.mw");
const { checkUser } = require("../middlewares/user.mw");
const tasksRouter = Router();

tasksRouter.get("/", paginate, TaskController.getTasks);
tasksRouter.get("/sum", TaskController.getSumTasks);

module.exports = tasksRouter;
