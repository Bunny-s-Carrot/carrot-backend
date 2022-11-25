const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

//app listen
app.listen(process.env.DB_PORT, () => {
  console.log("listening on 3306");
});

//app use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/react-app/build")));

//react-router-dom에 권한주기
app.get("*", (req, res) => {
  res.sendFile(__dirname + "react-app/build/index.html");
});
