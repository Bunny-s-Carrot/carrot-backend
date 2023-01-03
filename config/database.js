const { createPool } = require('mysql');
require("dotenv").config();

const pool = createPool ({
  port: process.env.DB_PORT,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

module.exports = pool;