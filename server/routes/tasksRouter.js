const { Router } = require("express");
const TaskController = require("../controllers/task.controller");
const { paginate } = require("../middlewares/paginate.mw");
const { checkTask } = require("../middlewares/task.mw");
const { checkUser } = require("../middlewares/user.mw");
const tasksRouter = Router();

tasksRouter.get("/", paginate, TaskController.getTasks);

module.exports = tasksRouter;
