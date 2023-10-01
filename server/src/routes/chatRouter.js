const { Router } = require('express');
const ChatController = require('../controllers/chatController');
const UserController = require('../controllers/userController');

const chatRouter = Router();

chatRouter.route('/').get(ChatController.getPreview);
chatRouter.route('/chat').get(ChatController.createConversation)
chatRouter.route('/chat/:id').get(ChatController.getChat);
chatRouter.route('/users').get(UserController.getUsers);

module.exports = chatRouter;
