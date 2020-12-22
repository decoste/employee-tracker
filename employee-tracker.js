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
                case "Update Departments, Roles, OR Employees":
                    update(connection);
                    break;
                    case "Delete Departments, Roles, Employees":
                        deleteData(connection);
                        break;
                default:
                    connection.end();
            }
        });

}

function view(connection) {
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

function addEmployee(connection) {

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


function addRole(connection) {
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

function addDepartment(connection) {
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


function update(connection) {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to update?",
                name: "action",
                choices: ["Employee role",
                    "Employee manager"
                ]
            }])
        .then(function (answer) {
            switch (answer.action) {
                case "Employee role":
                    updateRole(connection);
                    break;
                case "Employee manager":
                    updateEmpManager(connection);
                    break;
                default:
                    connection.end();
            }
        });


}


function updateRole(connection) {
    connection.query("SELECT * FROM employee LEFT JOIN role ON employee.id = role.id",
        function (err, result) {
            const joinedArray = [];
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "choice",
                        type: "list",
                        choices: function () {
                            for (let i = 0; i < result.length; i++) {
                                let emp = result[i].id
                                    + ", " + result[i].first_name
                                    + " " + result[i].last_name
                                    + ", " + result[i].title
                                    + ", " + result[i].role_id
                                joinedArray.push(emp);
                            }
                            return joinedArray;
                        },
                        message: "which employee you would like to change their role?",
                    },
                    {
                        name: "title",
                        type: "input",
                        message: "What is the employee new role?",
                    },
                    {
                        name: "roleId",
                        type: "input",
                        message: "What is the employee role Id?",
                    },
                ]).then(function (answer) {
                    connection.query('UPDATE employee LEFT JOIN role ON employee.id = role.id SET ? WHERE ?',
                           [{
                                title: answer.title
                            },
                            {
                                role_id: answer.roleId
                            }]
                        , function (err, res) {
                            viewRole(connection);
                            if (err) throw err;
                            console.table(res);
                            runSerach(connection);
                        });
                        
                });
        });
}


function updateEmpManager(connection) {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee left JOIN employee as emp ON employee.id = emp.manager_id",
    function (err, result) {
        const empArray = [];
        if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "choice",
                        type: "list",
                        choices: function () {
                            for (let i = 0; i < result.length; i++) {
                                let emp ="Id_" + result[i].id
                                    + ", " + result[i].first_name
                                    + " " + result[i].last_name
                                    + ", " + result[i].manager_id +"(ManagerId)"
                                empArray.push(emp);
                            }
                            return empArray;
                        },
                        message: "Which employee you would like to update their manager?",
                    },
                    
                    {
                        name: "empId",
                        type: "input",
                        message: "Enter the employee Id?",
                    },
                    {
                        name: "array",
                        type: "list",
                        choices: function () {
                            for (let i = 0; i < result.length; i++) {
                                let emp ="Id_" + result[i].id
                                    + ", " + result[i].first_name
                                    + " " + result[i].last_name
                                    + ", " + result[i].manager_id +"(ManagerId)"
                                empArray.push(emp);
                            }
                            return empArray;
                        },
                        message: "Who is the new manager?",
                    },
                    {
                        name: "managerId",
                        type: "input",
                        message: "Enter employee_Id for the new manager?",
                    },
                ]).then(function (answer) {
                    connection.query("UPDATE employee SET ? WHERE ?",
                           [{
                                manager_id: answer.managerId
                            },
                            {
                                id: answer.empId
                            }]
                        , function (err, res) {
                            viewEmployee(connection);
                            if (err) throw err;
                            console.table(res);
                            runSerach(connection);
                        });
                        
                });
            });
}
function deleteData(connection) {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like delete?",
                name: "action",
                choices: ["Departments",
                    "Roles",
                    "Employees"
                ]
            }])
        .then(function (answer) {
            switch (answer.action) {
                case "Departments":
                    deleteDebartment(connection);
                    break;
                case "Roles":
                    deleteRole(connection);
                    break;
                case "Employees":
                    deleteEmployee(connection);
                    break;
                default:
                    connection.end();
            }
        });


}


function deleteEmployee(connection) {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name from employee",
    function (err, result) {
        const empArray = [];
        if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "choice",
                        type: "list",
                        choices: function () {
                            for (let i = 0; i < result.length; i++) {
                                let emp ="Id_" + result[i].id
                                    + ", " + result[i].first_name
                                    + " " + result[i].last_name
                                empArray.push(emp);
                            }
                            return empArray;
                        },
                        message: "Which employee you would like to delete?",
                    },
                    {
                        name: "empId",
                        type: "input",
                        message: "Enter the employee Id?",
                    }
                ]).then(function (answer) {
                    connection.query("DELETE FROM  employee WHERE ?",
                            {
                                id: answer.empId
                            }
                        , function (err, res) {
                            viewEmployee(connection);
                            if (err) throw err;
                            console.table(res);
                            runSerach(connection);
                        });
                        
                });
            });
}

function deleteDebartment(connection) {
    connection.query("SELECT department.id, department.name from department",
    function (err, result) {
        const empArray = [];
        if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "choice",
                        type: "list",
                        choices: function () {
                            for (let i = 0; i < result.length; i++) {
                                let emp ="Id_" + result[i].id
                                    + ", " + result[i].name
                                empArray.push(emp);
                            }
                            return empArray;
                        },
                        message: "Which department you would like to delete?",
                    },
                    {
                        name: "depId",
                        type: "input",
                        message: "Enter the department Id?",
                    }
                ]).then(function (answer) {
                    connection.query("DELETE FROM department WHERE ?",
                            {
                                id: answer.depId
                            }
                        , function (err, res) {
                            viewDebartment(connection);
                            if (err) throw err;
                            console.table(res);
                            runSerach(connection);
                        });
                        
                });
            });
}

function deleteRole(connection) {
    connection.query("SELECT role.id, role.title from role",
    function (err, result) {
        const empArray = [];
        if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "choice",
                        type: "list",
                        choices: function () {
                            for (let i = 0; i < result.length; i++) {
                                let emp ="Id_" + result[i].id
                                    + ", " + result[i].title
                                empArray.push(emp);
                            }
                            return empArray;
                        },
                        message: "Which role you would like to delete?",
                    },
                    {
                        name: "roleId",
                        type: "input",
                        message: "Enter the role Id?",
                    }
                ]).then(function (answer) {
                    connection.query("DELETE FROM role WHERE ?",
                            {
                                id: answer.roleId
                            }
                        , function (err, res) {
                            viewRole(connection);
                            if (err) throw err;
                            console.table(res);
                            runSerach(connection);
                        });
                        
                });
            });
}


module.exports = { runSerach };