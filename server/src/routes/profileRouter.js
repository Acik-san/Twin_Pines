const { Router } = require('express');
const UserController = require('../controllers/userController');
const { checkUser } = require('../middlewares/user.mw');
const { upload } = require('../middlewares/uploadImage.mw');

const profileRouter = Router();

profileRouter.route('/:userName').get(UserController.getUserProfile);
profileRouter
  .route('/:userName/followers')
  .get(UserController.getUserFollowers);
profileRouter
  .route('/:userName/following')
  .get(UserController.getUserFollowing);
profileRouter
  .route('/:targetId/subscribe')
  .post(UserController.subscribeUser)
  .delete(UserController.unsubscribeUser);
profileRouter.route('/').patch(checkUser, upload, UserController.updateUser);

module.exports = profileRouter;
