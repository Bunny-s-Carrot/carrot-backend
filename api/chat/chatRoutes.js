const router = require('express').Router();
const Message = require('../../schemas');

router.get("/chat/1", (req, res) => {
    const message = new Message({
      chatroom_id: '12-33',
      message_id: 1,
      message_from: 12,
      message_to: 33,
      content: '안녕하세요',
      created_at: '2023-02-10 15:52:00'
    })
    message.save()
    .then((result) => res.json(result))
    .catch((error) => console.log(error))
})

module.exports = router;