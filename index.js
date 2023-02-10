const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
const cookieParser = require('cookie-parser');
const multer = require('multer')
const mainRouter = require('./routes');
const connect = require('./config/mongoDB');
const io = require('socket.io');

app.use(cors({
  origin: ['https://app.bunnyscarrot.com', 'http://localhost:3000'],
  credentials: true,
}));

app.use(multer().any())
app.use(cookieParser());
app.use(express.json());

app.use('/', mainRouter);

connect();

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on PORT: ${process.env.SERVER_PORT}`);
});

io(server, {
  cors: {
    origin: ['https://app.bunnyscarrot.com', 'http://localhost:3000']
  }
})