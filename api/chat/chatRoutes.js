const router = require('express').Router();
const chatController = require('./chatController');


router.post('/chatroom', chatController.createChatRoom);
router.get('/chatroom', chatController.getChatRoomById);
router.get('/chatroom/uuid/:uuid', chatController.getChatRoomByUuid);
router.get('/chatroom/:user_id', chatController.getChatRoomByUserId);
router.post('/chatroom/1', chatController.createMessage);
router.get('/chatroom/:uuid/message', chatController.getMessages);

module.exports = router;