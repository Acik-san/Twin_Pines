const { Router } = require("express");
const TaskController = require("../controllers/task.controller");
const { checkTask } = require("../middlewares/task.mw");
const { checkUser } = require("../middlewares/user.mw");
const tasksRouter = Router();

tasksRouter.post("/:userId/tasks", checkUser, TaskController.createTask);
tasksRouter.get("/", TaskController.getTasks);
tasksRouter.patch("/:taskId", checkTask, TaskController.updateTask);
tasksRouter.delete('/:taskId',checkTask,TaskController.deleteTask)

module.exports = tasksRouter;
