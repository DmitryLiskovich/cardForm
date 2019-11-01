const mysql = require("mysql");
require("dotenv").config;
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = process.env;
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});

module.exports = connection;
