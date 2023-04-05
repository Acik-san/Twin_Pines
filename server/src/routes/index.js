const { Router } = require('express');
const authRouter = require('./authRouter');
const usersRouter = require('./userRouter');
const tasksRouter = require('./tasksRouter');
const { checkAccessToken } = require('../middlewares/token.mw');
const router = Router();

router.use('/auth', authRouter);
router.use(checkAccessToken);
router.use('/users', usersRouter);
router.use('/tasks', tasksRouter);

module.exports = router;
