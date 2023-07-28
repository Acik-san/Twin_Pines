const { Router } = require('express');
const UserController = require('../controllers/userController');
const { checkUser } = require('../middlewares/user.mw');
const { upload } = require('../middlewares/uploadImage.mw');

const profileRouter = Router();

profileRouter.route('/').patch(checkUser, upload, UserController.updateUser);

module.exports = profileRouter;
