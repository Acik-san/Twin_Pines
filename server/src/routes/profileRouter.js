const { Router } = require('express');
const tasksRouter = require('./tasksRouter');
const UserController = require('../controllers/userController');
const TaskController = require('../controllers/taskController');
const { checkUser } = require('../middlewares/user.mw');
const { checkTask } = require('../middlewares/task.mw');
const { upload } = require('../middlewares/uploadImage.mw');

const profileRouter = Router();

profileRouter.route('/').patch(checkUser, upload, UserController.updateUser);
profileRouter.use('/tasks', tasksRouter);

module.exports = profileRouter;
