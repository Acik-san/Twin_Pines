const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const TaskController = require("../controllers/task.controller");
const { checkUser } = require("../middlewares/user.mw");
const { upload } = require("../middlewares/uploadImage.mw");

const usersRouter = Router();

usersRouter.post("/", upload, UserController.createUser);
usersRouter.get("/", UserController.getUsers);
usersRouter.get("/:userId", checkUser, UserController.getUser);
usersRouter.patch("/:userId", checkUser, UserController.updateUser);
usersRouter.delete("/:userId", checkUser, UserController.deleteUser);

module.exports = usersRouter;
