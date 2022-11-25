const mysql = require("mysql");
const axios = require("axios");

//db
const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

/**
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
