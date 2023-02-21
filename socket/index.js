const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
    console.log('연결이 이루어졌습니다.')
})


module.exports = socket;