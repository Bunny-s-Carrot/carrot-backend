const chatService = require("./chatService");

const createChatRoom = async (req, res) => {
  const body = req.body;
  await chatService.createChatRoom(body);

  return res.status(200).json({
    message: "Created ChatRoom Successfully"
  })
}

const getChatRoomById = async (req, res) => {
  const chatRoomIds = req.query.chatRoom_id;

  const data = await chatService.getChatRoomById(chatRoomIds);

  return res.status(200).json({
    payload: data
  });
}

const getChatRoomByUuid = async (req, res) => {
  const uuid = req.params.uuid;

  const data = await chatService.getChatRoomByUuid(uuid) ?? null;

  return res.status(200).json({
    payload: data
  })
}

const getChatRoomByBuyerId = async (req, res) => {
  const buyer_id = req.params.user_id;
  const data = await chatService.getChatRoomByBuyerId(buyer_id);
  // const sellerInfo = await 

  return res.status(200).json({
    payload: data
  });
}

const createMessage = async (req, res) => {
    const body = req.body;
    await chatService.createMessage(body);

    return res.json({
        message: "Create Message Successfully"
    });
}

const getMessages = async (req, res) => {
  const uuid = req.params.uuid;
  
  const messages = await chatService.getMessages(uuid)

  return res.status(200).json({
    payload: messages
  });
};

const chatController = {
    createChatRoom,
    getChatRoomById,
    getChatRoomByUuid,
    getChatRoomByBuyerId,
    createMessage,
    getMessages
}

module.exports = chatController;