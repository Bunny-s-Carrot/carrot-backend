const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/', mainRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on PORT: ${process.env.SERVER_PORT}`);
});

