const mysql = require("mysql");
const dotenv = require('dotenv').config();
require("console.table");
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
    console.log("connection successful!");
    test();
  });

function test() {
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.log(res);
    });
  }