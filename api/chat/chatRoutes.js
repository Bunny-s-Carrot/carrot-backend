const router = require('express').Router();
const chatController = require('./chatController');


router.post('/chatroom', chatController.createChatRoom);
router.get('/chatroom', chatController.getChatRoomById);
router.get('/chatroom/uuid/:uuid', chatController.getChatRoomByUuid);
router.get('/chatroom/:user_id', chatController.getChatRoomByBuyerId);
router.post('/chatroom/1', chatController.createMessage);

module.exports = router;