const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
require("dotenv").config();


app.get('/api', (req, res) => {
  res.json({
    success: 1,
    message: "This is rest apis working"
  })
})

//app listen
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

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

//app use
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname + "/react-app/build")));
//
// //react-router-dom에 권한주기
// app.get("*", (req, res) => {
//   res.sendFile(__dirname + "react-app/build/index.html");
// });
