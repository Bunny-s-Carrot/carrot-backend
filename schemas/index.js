const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    uuid: String,
    message_from: Number,
    content: String,
    created_at: String
});

module.exports = mongoose.model('message', messageSchema);