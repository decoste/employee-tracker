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
                    case "Add Departments, Roles, OR Employees":
                        add(connection);
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

function add(connection) {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to add?",
                name: "action",
                choices: ["Department",
                  "Role",
                    "Employee"
                ]
            }])
        .then(function (answer) {
            switch (answer.action) {
                case "Department":
                    addDepartment(connection);
                    break;
                    case "Role":
                        addRole(connection);
                        break;
                        case "Employee":
                            addEmployee(connection);
                            break;
                default:
                    connection.end();
            }
        });


}

function addEmployee(connection){
    
inquirer
.prompt([
    {
        type: "input",
        message: "What is the employee's first name?",
        name: "first",
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "last",
    },
    {
        type: "input",
        message: "What is the employee's role_id?",
        name: "roleId",
    },
    {
        name: 'confirm',
        type: 'confirm',
        message: "Does this employee has a manager?"
    },
    {
        name: 'managerId',
        type: 'input',
        message: "What is the manager id?",
        when: answer => answer.confirm === true
    }
])
.then(function (answer) {
    connection.query('INSERT INTO employee SET ?', {
        first_name: answer.first,
        last_name: answer.last,
        role_id: answer.roleId,
        manager_id: answer.managerId
    }, function (err, res) {
        viewEmployee(connection);
        if (err) throw err;
        console.table(res);
        runSerach(connection);
    });

});

 
}


function addRole(connection){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title?",
            name: "title",
        },
        {
            type: "input",
            message: "What is the salary?",
            name: "salary",
        },
        {
            type: "input",
            message: "What is the department_id?",
            name: "departmentId",
        }
    ])
    .then(function (answer) {
        connection.query('INSERT INTO role SET ?', {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
        }, function (err, res) {
            viewRole(connection);
            if (err) throw err;
            console.table(res);
            runSerach(connection);
        });
    
    });
    
     
    }  
    
function addDepartment(connection){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the department's name?",
            name: "name"
        }
    ])
    .then(function (answer) {
        connection.query('INSERT INTO department SET ?', {
            name: answer.name,
        }, function (err, res) {
            viewDebartment(connection);
            if (err) throw err;
            console.table(res);
            runSerach(connection);
        });
    
    });
    }    


module.exports = { runSerach };