const { Router } = require('express');
const TaskController = require('../controllers/taskController');
const { checkUser } = require('../middlewares/user.mw');
const { checkTask } = require('../middlewares/task.mw');

const tasksRouter = Router();

tasksRouter
  .route('/')
  .get(checkUser, TaskController.getUserTasks)
  .post(checkUser, TaskController.createTask);
tasksRouter
  .route('/:taskId')
  .get(checkUser, checkTask, TaskController.getUserTask)
  .patch(checkUser, checkTask, TaskController.updateTask)
  .delete(checkUser, checkTask, TaskController.deleteTask);

module.exports = tasksRouter;
