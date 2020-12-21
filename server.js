const mysql = require("mysql");
const employeeTracker = require("./employee-tracker");
const { runSerach } = require("./employee-tracker");
const dotenv = require('dotenv').config();
require("console.table");
const emp = require("./employee-tracker")
// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
  database: "employeeTracker_DB",
});
connection.connect(function (err) {
    if (err) throw err;
    runSerach(connection);
  });
 

  //Source: https://stackoverflow.com/questions/51323506/
  //nodejs-cannot-read-property-query-of-undefined
  module.connection= connection