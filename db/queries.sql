SELECT * from department;

SELECT * from emp_role;

SELECT * from employee;

INSERT INTO department (id, dept_name)
VALUE ();

INSERT INTO emp_role (id, title, manager,salary,dept_id)
VALUE ();

INSERT INTO employee (id, first_name,last_name,role_id,manager_id)
VALUE ();

DELETE FROM department
WHERE dept_id = ;

DELETE FROM emp_role
WHERE id = ;

DELETE FROM employee
WHERE id = ;

SELECT * FROM employee
WHERE id = ;

UPDATE employee
SET role_id = ;
WHERE id = ;

UPDATE employee
SET manager_id = ;
WHERE id = ;

SELECT * FROM employee
WHERE manager_id = ;

SELECT * 
FROM department
RIGHT JOIN emp_role on emp_role.dept_id = department.id
RIGHT JOIN employee on employee.role_id = emp_role.id
where department.id = ;

SELECT CONCAT(employee.id, ' ', employee.first_name,' ',employee.last_name) as MANAGERS 
FROM emp_role
RIGHT JOIN employee on employee.role_id = emp_role.id
where emp_role.manager = true;

SELECT department.dept_name, SUM(emp_role.salary)
FROM department
RIGHT JOIN emp_role on emp_role.dept_id = department.id
RIGHT JOIN employee on employee.role_id = emp_role.id
where department.id = 1
GROUP BY department.id;