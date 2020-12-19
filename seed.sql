DROP DATABASE IF EXISTS employeeTracker_DB;

CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department (
  id INTEGER primary key auto_increment,
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2),
  department_id INTEGER NOT NULL,
  --Reference: https://www.mysqltutorial.org/mysql-foreign-key/
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INTEGER NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
