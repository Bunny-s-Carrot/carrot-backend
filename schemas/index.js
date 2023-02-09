const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    chatroom_id: String,
    message_id: Number,
    message_from: Number,
    message_to: Number,
    content: String,
    created_at: String
});