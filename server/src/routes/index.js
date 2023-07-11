const { Router } = require('express');
const { checkAccessToken } = require('../middlewares/token.mw');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');
const chatRouter = require('./chatRouter');
const router = Router();

router.use('/auth', authRouter);
router.use(checkAccessToken);
router.use('/profile', profileRouter);
router.use('/chats', chatRouter);

module.exports = router;
