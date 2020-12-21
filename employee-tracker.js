var inquirer = require("inquirer");
const department = require("./Develop/lib/Department");
const role = require("./Develop/lib/Role")
const employee = require("./Develop/lib/Employee");
const Department = require("./Develop/lib/Department");
var connection = require('./server');
require("console.table");

function runSerach(connection) {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: ["View Departments, Roles, Or Employees",
                    "Add Departments, Roles, OR Employees",
                    "Update Departments, Roles, OR Employees",
                    "Delete Departments, Roles, Employees",
                ]
            }])
        .then(function (answer) {
            switch (answer.action) {
                case "View Departments, Roles, Or Employees":
                    view(connection);
                    break;
                default:
                    connection.end();
            }
        });

}

function view(connection){
    inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like view?",
            name: "action",
            choices: ["Departments",
                "Roles",
                "Employees"
            ]
        }])
    .then(function (answer) {
        switch (answer.action) {
            case "Departments":
                viewDebartment(connection);
                break;
                case "Roles":
                viewRole(connection);
                break;
                case "Employees":
                    viewEmployee(connection);
                    break;
            default:
                connection.end();
        }
    });


}
function viewEmployee(connection) {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSerach(connection);
    });
}

function viewDebartment(connection) {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSerach(connection);
    });
}

function viewRole(connection) {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSerach(connection);
    });
}

module.exports = { runSerach };