const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const { checkAuth } = require('../middlewares/checkToken.mw');
const { checkRefreshToken } = require('../middlewares/token.mw');

authRouter.get('/',checkAuth)
authRouter.post('/sign-in', AuthController.signIn);
authRouter.post('/sign-up', AuthController.signUp);
authRouter.post('/refresh', checkRefreshToken, AuthController.refresh);

module.exports = authRouter;
