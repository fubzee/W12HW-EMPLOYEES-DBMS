const { Console } = require('console');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2/promise');
const PORT = process.env.PORT || 3001;
const app = express();
require('dotenv').config();
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'employees_db'
  }
);

let sqlresults = {};

sqlresults.getDepartment = () => 
{
  return new Promise((results, reject)=>
  {
    db.query('SELECT * from department', (error, departmentResults) => 
    { 
      if (error) 
      {
        console.log(`Error`,error);
        return reject(error);
      }
      console.log(`results`,departmentResults);
      return results(departmentResults);
    }); 
  });
  // const [departmentResults] = await db.query('SELECT * from department');
  // console.log(departmentResults);
};


sqlresults.getEmployeeRole = () => 
{
  return new Promise((results, reject)=>
  {
    db.query('SELECT * from emp_role', (error, employeeroleResults) => 
    { 
      if (error) 
      {
        console.log(`Error`,error);
        return reject(error);
      }
      console.log(`results`,employeeroleResults);
      return results(employeeroleResults);
    }); 
  });
};

sqlresults.getEmployeeRoleTitle = () => 
{
  return new Promise((results, reject)=>
  {
    db.query('SELECT * from emp_role', (error, employeetitleResults) => 
    { 
      if (error) 
      {
        console.log(`Error`,error);
        return reject(error);
      }
      console.log(`results`,employeetitleResults);
      return results(employeetitleResults);
    }); 
  });
};

sqlresults.getEmployee = () => 
{
  return new Promise((results, reject)=>
  {
    db.query('SELECT * from emp_role', (error, employeeResults) => 
    { 
      if (error) 
      {
        console.log(`Error`,error);
        return reject(error);
      }
      console.log(`results`,employeeResults);
      return results(employeeResults);
    }); 
  });
};

sqlresults.insertDepartment = (name) => 
{
  return new Promise ((results, reject) => 
  {
    db.query(`INSERT INTO department (name) VALUES (?)`,[name], (error) => {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.insertEmployeeRole = (addRole,addIsManager,salary,EmpDeptId) => 
{
  return new Promise ((results, reject) => 
  {
    db.query(`INSERT INTO emp_role (id, title, manager,salary,dept_id) VALUE (?,?,?,?)`,[addRole,addIsManager,salary,EmpDeptId], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.insertEmployee = (firstName,lastName,eddEmpRole,EmpManager) => 
{
  return new Promise ((results, reject) => 
  {
    db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUE (?,?,?,?)`,[firstName,lastName,eddEmpRole,EmpManager], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.deleteEmployee = (id) => 
{
  return new Promise ((results, reject) => 
  {
    db.query(`DELETE FROM employee WHERE id = ?`,[id], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.deleteDepartment = (id) => 
{
  return new Promise ((results, reject) => 
  {
    db.query('DELETE FROM department WHERE id = ?;',[id], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.deleteEmployeeRole = (id) => 
{
  return new Promise ((results, reject) => 
  {
    db.query(`DELETE FROM emp_role WHERE id = ? ;`,[id], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.getEmployeeById = (id) => 
{
  return new Promise ((results, reject) => 
  {
    db.query(`SELECT * FROM employee WHERE id = ?`,[id], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.Updateemployeerole = (empnewrole,empId) => 
{
  return new Promise ((results, reject) => 
  {
    db.query('UPDATE employee SET empnewrole = ? WHERE empId = ?',[empnewrole,empId], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.UpdateEmployeeManager = (empnewMan, empId) => 
{
  return new Promise ((results, reject) => 
  {
    db.query('UPDATE employee SET manager_id ? = WHERE id = ?;',[empnewMan, empId], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.readmanageremployees = (ManId) =>
{
  return new Promise ((results, reject) => 
  {
    db.query(`SELECT * FROM employee WHERE manager_id = ?`,[ManId], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.manageremployeeslist = () =>
{
  return new Promise ((results, reject) => 
  {
    db.query(`SELECT CONCAT(employee.id," ", employee.first_name," ",employee.last_name) as MANAGERS  FROM emp_role RIGHT JOIN employee on employee.role_id = emp_role.id where emp_role.manager = true`, (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.queryEmployeeByDept = (id) =>
{
  return new Promise ((results, reject) => 
  {
    db.query(`SELECT * FROM department RIGHT JOIN emp_role on emp_role.dept_id = department.id RIGHT JOIN employee on employee.role_id = emp_role.id where department.id = ?`, [id], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

sqlresults.queryDeptBudget = (id) =>
{
  return new Promise ((results, reject) => 
  {
    db.query('SELECT department.dept_name, SUM(emp_role.salary) FROM department RIGHT JOIN emp_role on emp_role.dept_id = department.id RIGHT JOIN employee on employee.role_id = emp_role.id where department.id = ? GROUP BY department.id;', [id], (error) => 
    {
      if (error)
      {
        return reject(error);
      }
      return results();
    });
  });
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = sqlresults;
