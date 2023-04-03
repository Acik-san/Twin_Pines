const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const TaskController = require("../controllers/task.controller");
const { checkUser } = require("../middlewares/user.mw");
const { checkTask } = require("../middlewares/task.mw");
const { paginate } = require("../middlewares/paginate.mw");
const { upload } = require("../middlewares/uploadImage.mw");

const usersRouter = Router();
usersRouter.route("/sum").get(UserController.getSumUsers);

usersRouter
  .route("/")
  .post(upload, UserController.createUser)
  .get(paginate, UserController.getUsers);

usersRouter
  .route("/:userId")
  .get(checkUser, UserController.getUser)
  .patch(checkUser, upload, UserController.updateUser)
  .delete(checkUser, UserController.deleteUser);

usersRouter
  .route("/:userId/tasks")
  .post(checkUser, TaskController.createTask)
  .get(checkUser, TaskController.getUserTasks);

usersRouter
  .route("/:userId/tasks/:taskId")
  .get(checkUser, checkTask, TaskController.getUserTask)
  .patch(checkUser, checkTask, TaskController.updateTask)
  .delete(checkUser, checkTask, TaskController.deleteTask);

module.exports = usersRouter;
