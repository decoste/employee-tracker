INSERT INTO department (name)
VALUES ("Production"),
("R&D"),
("Marketing"),
("IT"),
("Accounting"),
("Human Resource");

INSERT INTO role (title, salary, department_id)
VALUES ("Warehouse Manager", 47000, 1),
("Software engineer", 87000, 4),
("Project Accountant", 71000, 5),
("R&D manager", 113000, 2),
("Research Scientist", 84000, 2),
("Marketing analyst", 76000, 3),
("HR assistant", 54000, 6),
("Software development manager", 170000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Tucker", 1),
("Sara", "Roy", 2),
("Bill", "Randel", 5),
("Jolia", "Grande", 4),
("Emir", "Sa'ad", 3),
("Sandy", "Louis", 6),
("Andrew", "Bristol", 7),
("Jude", "Jarred", 8);

--Add manager_id info:
UPDATE employee 
SET manager_id = 4 WHERE id = 8;
UPDATE employee 
SET manager_id = 1 WHERE id = 4;

