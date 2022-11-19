const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const axios = require("axios");

//module import
const auth = require("./middleware/auth");
const jwt = require("./auth/jwt_util");
const redisClient = require("./auth/redis");

//app listen
app.listen(8080, () => {
  console.log("listening on 8080");
});

//app use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/react-app/build")));

//db
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "carrotdb",
});
/** 
connection.connect((err)=>{
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query("INSERT INTO table value", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.query("SELECT * FROM table", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.query("UPDATE table SET column=value WHERE condition", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.query("DELETE FROM table WHERE condition", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();
**/

/*
let numId = 0;
app.post("/register", (req, res) => {
  const userData = {
    id: ++numId,
    user_id: req.body.user_id,
    user_password: req.body.user_password,
  };
  //db에 create하기
  res.send('respond')
});

*/

//login
const login = async (req, res) => {
  //db에서 아이디와 비번확인->만들어야 함
  if (success) {
    const accessToken = jwt.sign(user);
    res.status(200).send({
      ok: true,
      data: {
        accessToken,
      },
    });
  } else {
    res.status(401).send({
      ok: false,
      message: "password is incorrect",
    });
  }
};

//react-router-dom에 권한주기
app.get("*", (req, res) => {
  res.sendFile(__dirname + "react-app/build/index.html");
});
