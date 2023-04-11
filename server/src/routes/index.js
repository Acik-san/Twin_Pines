const { Router } = require('express');
const UserController = require('../controllers/userController');
const TaskController = require('../controllers/taskController');
const { checkUser } = require('../middlewares/user.mw');
const { checkTask } = require('../middlewares/task.mw');
const { upload } = require('../middlewares/uploadImage.mw');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');
const { checkAccessToken } = require('../middlewares/token.mw');
const router = Router();

router.use('/auth', authRouter);
router.use(checkAccessToken);
router.use('/profile', profileRouter);


module.exports = router;
