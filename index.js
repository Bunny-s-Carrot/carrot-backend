const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
const cookieParser = require('cookie-parser');
const multer = require('multer')
const mainRouter = require('./routes');

app.use(cors({
  origin: ['https://app.bunnyscarrot.com', 'http://localhost:3000', 'http://192.168.1.103:3000'],
  credentials: true,
}));

app.use(multer().any())
app.use(cookieParser());
app.use(express.json());

app.use('/', mainRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on PORT: ${process.env.SERVER_PORT}`);
});

