const { Router } = require("express");
const usersRouter = require("./userRouter");
const tasksRouter = require("./tasksRouter");
const { checkUser } = require("../middlewares/user.mw");
const router = Router();

router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);

module.exports = router;
