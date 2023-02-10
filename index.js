const express = require("express");
const app = express();
const http = require('http')
const cors = require('cors');
const { Server } = require('socket.io');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const multer = require('multer')
const mainRouter = require('./routes');
const mongoDBConnect = require('./config/mongoDB');


app.use(cors({
  origin: ['https://app.bunnyscarrot.com', 'http://localhost:3000'],
  credentials: true,
}));

app.use(multer().any())
app.use(cookieParser());
app.use(express.json());

app.use('/', mainRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'app.bunnyscarrot.com']
  }
});

mongoDBConnect();

server.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on PORT: ${process.env.SERVER_PORT}`);
});

io.on('connection', socket => {
  console.log('Connected with Id: ', socket.id);

  socket.on('message', (data) => {
    console.log(data);
  })

  socket.emit('message2', "서버에서 보내는 메시지");
})