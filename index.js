const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
const mainRouter = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/', mainRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on PORT: ${process.env.SERVER_PORT}`);
});

