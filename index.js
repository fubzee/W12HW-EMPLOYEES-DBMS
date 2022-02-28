const console = require(`console`);
const fs = require(`fs`);
const inquirer = require(`inquirer`);
const table = require('console.table');
const choices = require(`inquirer/lib/objects/choices`);//?
//const sqlresults = require("./js/server-promises");
//const server = require(`./router`);
const express = require('express');
const mysql = require('mysql2/promise');
const { initial } = require("lodash");
const { id } = require('prelude-ls');
const PORT = process.env.PORT || 3001;
const app = express();
require('dotenv').config();
const sqldb = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'employees_db'
  }
);
var departments = () => queryalldepartments();

const MainMenu = async () => 
{      
    const mainselect = await inquirer.prompt ([
        { 
            type: `list`,
            name: `menu`,
            message: `What would you like to do ?`,
            choices: [`Add/Create Records`, 
                      `Read/Query Data`,
                      `Update Employee Data`,
                      `Delete Records`,
                      `Exit`],
            validate: (value) => 
            {
                if (value) {
                    return true;
                } else {
                    return `Please make a selection`;
                }
            }
        }
    ])
    .then (async (answers) => 
    {
        switch (answers.menu)
        {
            case `Add/Create Records` : 
                selectAddMenuItems();
                break;
            case `Read/Query Data`:
                selectReadMenuItems();
                break;
            case `Update Employee Data`:
                selectUpdateMenuItems();
                break;
            case `Delete Records`:
                selectDeleteMenuItems();
                break;
            case `Exit`:
                Console.log("Exiting Application");
        }
    })
};

const selectAddMenuItems = async () => 
{      
    const queryselect = await inquirer.prompt ([
        { 
            type: `list`,
            name: `createmenu`,
            message: `What would you like to Add ?`,
            choices: [  `Department`,
                        `Employee Role`,
                        `Employee`,
                        `Return to Main Menu`],
            validate: (value) => 
            {
                if (value) {
                    return true;
                } else {
                    return `Please make a selection`;
                }
            }
        }
    ]) 
    .then (async (answers) => 
    {
        switch (answers.createmenu)
        {
            case `Department` : 
                insertDepartment();
                
            break;
            case `Employee Role`:
                insertEmployeeRole();
                
                break;
            case `Employee`:
                insertEmployee();
               
                break;
            case `Return to Main Menu`:
                
                break;
        }
    }
)};
const selectReadMenuItems = async () => 
{      
    const queryselect = await inquirer.prompt ([
        { 
            type: `list`,
            name: `querymenu`,
            message: `What would you like to query ?`,
            choices: [  `View all Departments`,
                        `View all Roles`,
                        `View all Employess`,
                        `View Employees By Manager`,
                        `View Employees by Department`,
                        `View Department Salary Budget`,
                        `Return to Main Menu`],
            validate: (value) => 
            {
                if (value) {
                    return true;
                } else {
                    return `Please make a selection`;
                }
            }
        }
    ]) 
    .then (async (answers) => 
    {
        switch (answers.querymenu)
        {
            case 'View all Departments':
                queryalldepartments();
                break;
            case `View all Roles`:
                queryallroles();
                break;
            case `View all Employess`:
                queryallemployees();
            break;
            case `View Employees By Manager` : 
                queryEmployeesByManager();
            break;
            case `View Employees by Department`:
                queryEmployeeByDept();
                break;
            case `View Department Salary Budget`:
                queryDeptBudget();
                break;
            case `Return to Main Menu`:
                MainMenu();
                break;
        }
    })
};

const selectUpdateMenuItems = async () => 
{      
    const updateselect = await inquirer.prompt ([
        { 
            type: `list`,
            name: `updatemenu`,
            message: `What would you like to update ?`,
            choices: [  `Employee Role`,
                        `Employee's Manager`,
                        `Return to Main Menu`],
            validate: (value) => 
            {
                if (value) {
                    return true;
                } else {
                    return `Please make a selection`;
                }
            }
        }
    ]) 
    .then (async (answers) => 
    {
        switch (answers.updatemenu)
        {
            case `Employee Role` : 
                Updateemployeerole();
            break;

            case `Employee's Manager`:
                UpdateEmployeeManager();
                break;

            case `Return to Main Menu`:
                MainMenu();
                break;
        }
    })
};

const selectDeleteMenuItems = async () => 
{      
    const deleteselect = await inquirer.prompt ([
        { 
            type: `list`,
            name: `deletemenu`,
            message: `What would you like to delete ?`,
            choices: [  `Department`,
                        `Employee Role`,
                        `Employee`,
                        `Return to Main Menu`],
            validate: (value) => 
            {
                if (value) {
                    return true;
                } else {
                    return `Please make a selection`;
                }
            }
        }
    ]) 
    .then (async (answers) => 
    { 
        switch (answers.deletemenu)
        {
            case `Department` : 
                deleteDepartment();
            break;

            case `Employee Role`:
                deleteEmployeeRole();
                break;

            case `Employee`:
                deleteEmployee();
                break;

            case `Return to Main Menu`:
                MainMenu();
                break;
        }
    })
};

const employeerolechoices = async () =>
{
    const db = await sqldb;
    // return new Promise((results, reject)=>
    // {
      db.query('SELECT * from emp_role').then(([result]) => console.log(result))
    //   , (error, employeetitleResults) => 
    //   { 
    //     if (error) 
    //     {
    //       console.log(`Error`,error);
    //       return reject(error);
    //     }
    //     console.log(`results`,employeetitleResults);
    //     return results(employeetitleResults);
    //   }); 
    // });
};

async function manageremployees()
{
    const db = await sqldb;

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
}

async function queryalldepartments()
{
    const db = await sqldb;
    console.log(`Build departments`);
    return new Promise((results, reject) =>
    {
      db.query(`SELECT * from department`, [results], (error) => 
      { 
        if (error) 
        {
          console.log(`Error`,error);
          return reject(error);
        }
        console.log(`results1`,results)
    })
    .then((results) =>
    {   
        console.table(`results2`,results);

    
        inquirer.prompt ([
            {
                type: `list`,
                name: `DeptId`,
                message: `Please select a department?`,
                choices: (results),
                validate: (value) => 
                {
                    if (value)
                    {
                        return true;
                    } 
                    else 
                    {
                        return `Please select a department`;
                    }
                }
            }]);
        }); 
    }); 
};
    




async function insertDepartment() 
{
    const db = await sqldb;
    return inquirer.prompt ([
        {
            type: `input`,
            name: `addDept`,
            message: `What is the name of the department ?`,
            validate: (value) => 
            {
                if (value) {
                    return true;
                } else {
                    return `Please enter the name of the department`;
                }
            }
        },
    ])
.then( async (answer) => 
    {
        let newDept = answer.addDept;
        return new Promise ((results, reject) => 
        {
            db.query(`INSERT INTO department (dept_name) VALUES (?)`,[newDept], (error) => 
            
            {
                if (error)
                {
                        return reject(error);
                }
                return results();
            });
            console.log(`Success`);
            nextAction();
        });
    })
};

async function nextAction()
{
    const newOption = await inquirer.prompt([
        {
            type: `list`,
            name: `nextAction`,
            message: `Return to Create/Add more Items or Retuen to Main Menu ?`,
            choices: [`Main Menu`, `Add More Items`],
            validate: (value_1) => {
                if (value_1) {
                    return true;
                } else {
                    return `Please enter the name of the department`;
                }
            }
        },
    ]);
    switch (newOption.nextAction) {
        case `Main Menu`:
            MainMenu();
            break;

        case `Add More Items`:
            selectAddMenuItems();
            break;
    }
};


async function insertEmployeeRole()
{
    const db = await sqldb;

    // .map((department) => { {`name + departments.dept_name`; `id` + departments.id}};

    return inquirer.prompt ([
        {
            type: `input`,
            name: `addRole`,
            message: `What is the name or title of the role ?`,
            validate: (value) => 
            {
                if (value) {
                    return true;
                } else {
                    return `Please enter the name of the role`;
                }
            }
        },
        {
            type: `list`,
            name: `addIsManager`,
            message: `Is this new role a manager's position?`,
            choices: [`Yes`,`No`],
            validate: (value) => 
            {
                if (value) {
                    return true;
                } else {
                    return `Please select YES/NO to indcate if the role is a manager's role`;
                }
            }
        },
        {
            type: `input`,
            name: `salary`,
            message: `What is the budgeted salary for the role?`,
            validate: (value) => 
            {
                if (value) {
                    return true;
                } else {
                    return `Please enter the budgeted salary for the role`;
                }
            }
        },
        // {
        //     type: `list`,
        //     name: `EmpDeptId`,
        //     message: `In which department is this role allocated?`,
        //     choices: departments,
           
        //     validate: (value) => 
        //     {
        //         if (value) {
        //             return true;
        //         } else {
        //             return `Please select the department this role belongs to`;
        //         }
        //     }
        // },
    ])
.then((answer) => 
    {
        let newRole = answer.addRole;
        let isManager = answer.addIsManager;
        let addsalary = answer.salary;
        let roledept = answer.EmpDeptId;
        return new Promise ((results, reject) => 
        {
        db.query(`INSERT INTO emp_role (title, manager,salary,dept_id) VALUE (?,?,?,?)`,[newRole,isManager,addsalary,roledept], (error) => 
        {
            if (error)
            {
                    return reject(error);
            }
            return results();
        });
            console.log(`Success`);
            nextAction();
        });
        
    });
};

async function 
insertEmployee() 
{
    const db = await sqldb;
    return inquirer.prompt ([
        {
            type: `input`,
            name: `firstName`,
            message: `What is the employee's name?`,
            when: (input) => input.adding === "Employee" && input.functionlist === `Add details`,
            validate: (value) => 
            {
                if (value) 
                {
                    return true;
                }
                else 
                {
                    return `Please enter the budgeted salary for the role`;
                }
            }
        },
        {
            type: `input`,
            name: `lastName`,
            message: `What is the employee's surname?`,
            when: (input) => input.adding === "Employee" && input.functionlist === `Add details`,
            validate: (value) => 
            {
                if (value) 
                {
                    return true;
                } 
                else 
                {
                    return `Please enter the budgeted salary for the role`;
                }
            }
        },
        {
            type: `list`,
            name: `addempRole`,
            message: `What role is this new employee assuming?`,
            choices: employeerolechoices,
            when: (input) => input.adding === "Employee Role" && input.functionlist === `Add details`,
            validate: (value) => 
            {
                if (value) 
                {
                    return true;
                } 
                else 
                {
                    return `Please select the new emploee's role`;
                }
            }
        },

        {
            type: `list`,
            name: `addempManager`,
            message: `Who is the manager's this role is reporitng too?`,
            choices: manageremployees,
            when: (input) => input.adding === "Employee Role" && input.functionlist === `Add details`,
            validate: (value) => 
            {
                if (value) 
                {
                    return true;
                } 
                else 
                {
                    return `Please select YES/NO to indcate if the role is a manager's role`;
                }
            }
        },
    ])
.then((answer) => 
    {
        let firstName = answer.firstName;
        let lastName = answer.lastName
        let empRole = answer.salary;
        let empManager = answer.addempMnager;
        return new Promise ((results, reject) => 
        {
            db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUE (?,?,?,?)`,[firstName,lastName,empRole,empManager], (error) => 
            {
                if (error)
                {
                        return reject(error);
                }
                return results();
            });
            console.log(`Success`);
            nextAction();
        });
    });
};

async function Updateemployeerole() 
{
    const db = await sqldb;
    return inquirer.prompt ([
    {
        type: `input`,
        message: `Please enter the Employee ID`,
        name: `empId`,
        validate: (value) => 
        {
            if (value) 
            {
                return true;//do a query to employees and see if id exists - error if not found, 
            }
            else
            {
                return `That employee ID does not exist - please enter a valid employee id`;
            }
        }
    },
    {
        type: `list`,
        message: `Please select the employees new role/title`,
        name: `empnewrole`,
        choices: employeerolechoices(),
        validate: (value) => 
        {
            if (value) 
            {
                return true;
            }
            else
            {
                return `Please select which details you want to add`;
            }
        }
    },
    ])
.then((answer) => 
    {
        let Updid = answer.empId;
        let UpdRole = answer.empnewrole;
        return new Promise ((results, reject) => 
        {
            db.query('UPDATE employee SET empnewrole = ? WHERE empId = ?',[UpdRole,Updid], (error) => 
            {
                if (error)
                {
                return reject(error);
                }
                return results();
            });
            console.info(results);
        });
   
    });
};

async function UpdateEmployeeManager()
{
    const db = await sqldb;
    return inquirer.prompt ([
    {
        type: `input`,
        message: `Please enter the Employee ID`,
        name: `empId`,
        validate: (value) => 
        {
            if (value) {
                return true;//do a query to employees and see if id exists - error if not found, 
            } else {
                return `That employee ID does not exist - please enter a valid employee id`;
            }
        }
    },
    {
        type: `list`,
        message: `Please select the employees new manager's name`,
        name: `empnewman`,
        choices: manageremployees,
        when: (input) => input.changing === `Employee Manager` && input.functionlist === `Update details`,
        validate: (value) => 
        {
            if (value) {
                return true;
            } else {
                return `Please select which details you want to add`;
            }
        }
    },
])
.then((answer) => 
    {
        let Updid = answer.empId;
        let UpdManager = answers.empnewMan;
        return new Promise ((results, reject) => 
        {
            db.query('UPDATE employee SET manager_id ? = WHERE id = ?;',[UpdManager, Updid], (error) => 
            {
                if (error)
                {
                    return reject(error);
                }
                return results();
            });
        });
    })
};



// queryalldepartments = async () => 

// {

//     const db = await sqldb;
//     db.query('SELECT * from department');
//     console.table(results);
//     return results;
// };

async function queryallroles()
{
    const db = await sqldb;
    
    const employeeroleResults = db.query(`Select * from emp_role`).then (([employeeroleResults]) =>
     
         console.log(employeeroleResults));
         
        
    };
    
     
    
    // , function (err,results) {
    // console.Table(results);
    
    
    //});

async function queryallemployees()
{ 
    const db = await sqldb;
   db.query(`Select * from employee`).then(console.table(employees)), (err,results)
};


async function queryEmployeesByManager() 
{
    const db = await sqldb;
    return inquirer.prompt ([
        {
            type: `list`,  
            message: `Please select the manager`,
            name: `ManId`,
            choices: manageremployees,
            validate: (value) => 
            {
                if (value) {
                    return true; 
                } else {
                    return `Please select which details you want to add`;
                }
            }
        },
    ])
.then((answer) => 
    {
        let managerid = answer.ManId;
        return new Promise ((results, reject) => 
        {
            db.query(`SELECT * FROM employee WHERE manager_id = ?`,[managerid], (error) => 
            {
                if (error)
                    {
                         return reject(error);
                    }
                     return results();
                });
            console.table(results);
        });
    });
};

async function queryEmployeeByDept()
{
    const db = await sqldb;

    return inquirer.prompt ([
        {
            type: `list`,  
            message: `Please select the department`,
            name: `DeptId`,
            choices: departments,
            validate: (value) => 
            {
                if (value) {
                    return true; 
                } else {
                    return `Please select which details you want to add`;
                }
            }
        },
    ])
.then((answer) => 
    {
        let deptid = answer.DeptId;
        return new Promise ((results, reject) => 
        {
          db.query(`SELECT * FROM department RIGHT JOIN emp_role on emp_role.dept_id = department.id RIGHT JOIN employee on employee.role_id = emp_role.id where department.id = ?`, [deptid], (error) => 
            {
                if (error)
                {
                    return reject(error);
                }
                return results();
            });
            console.table(results);
        });
    });
};

async function queryDeptBudget()
{
    const db = await sqldb;
    return inquirer.prompt ([
    {
        type: `list`,  
        message: `Please select the department`,
        name: `DeptId`,
        choices: departments,
        validate: (value) => 
        {
            if (value) 
            {
                return true; 
            } 
            else 
            {
                return `Please select which details you want to add`;
            }
        }
    }])

.then((answer) => 
    {
        return new Promise ((results, reject) => 
        {
            db.query('SELECT department.dept_name, SUM(emp_role.salary) FROM department RIGHT JOIN emp_role on emp_role.dept_id = department.id RIGHT JOIN employee on employee.role_id = emp_role.id where department.id = ? GROUP BY department.id;', [deptid], (error) => 
            {
                if (error)
                {
                    return reject(error);
                }
                return results();
            });
            console.table(results);
        }); 
    });
};

async function deleteDepartment()
{
    const db = await sqldb;
    return inquirer.prompt ([
        {
            type: `list`,
            name: `delDept`,
            message: `Which department are you deleting ?`,
            choices: departments,
            when: (input) => input.functionlist === `Delete details` && input.deleting === `Department`,
            validate: (value) => 
            {
                if (value) 
                {
                    return true;
                } 
                else 
                {
                    return `Please select the department being deleted`;
                }
            }
        },
    ])
.then((answer) => 
    {
        let deptid = answer.DeptId;
        return new Promise ((results, reject) => 
        {
            db.query('DELETE FROM department WHERE id = ?;',[deptid], (error) => 
            {
                if (error)
                {
                    return reject(error);
                }
            return results();
            });
            console.table(results);
        });
    });
};

async function deleteEmployeeRole()
{
    const db = await sqldb;
    return inquirer.prompt ([
    {
        type: `list`,
        name: `delEmpRole`,
        message: `Which role are you deleting ?`,
        choices: employeerolechoices,
        when: (input) => input.functionlist === `Delete details` && input.deleting === `Employee Role`,
        validate: (value) => 
        {
            if (value) 
            {
                return true;
            } 
            else 
            {
                return `Please select your role that is being deleted`;
            }
        }
    }])
.then((answer) => 
    {
        let roleid = answer.delEmpRole;
        return new Promise ((results, reject) => 
        {
            db.query(`DELETE FROM emp_role WHERE id = ? ;`,[roleid], (error) => 
            {
                if (error)
                {
                     return reject(error);
                }
                return results();
            });
        });
    });
};

async function deleteEmployee()
{
    const db = await sqldb;
    return inquirer.prompt ([
    {
        type: `input`,
        name: `delEmp`,
        message: `Which employee are you deleting ?`,
        when: (input) => input.functionlist === `Delete details` && input.deleting === `Employee`,
        
        validate: (value) => 
        {
            if (value) 
            {
                return true;
            } 
            else
            {
                return `Please select the employee to be deleted`;
            }
        }
    },
    ])
.then((answer) => 
    {
        let delemp = answer.delEmp;
        return new Promise ((results, reject) => 
        {
             db.query(`DELETE FROM employee WHERE id = ?`,[delemp], (error) => 
            {
                if (error)
                {
                    return reject(error);
                }
                return results();
            });
        });
    });
};

MainMenu();


//>>>>>>>>  delete inquirer stuff
//         {
//             type: `list`,
//             message: `Please enter the DepartmentID`,
//             name: `DepId`,
//             choices: departments,
//             when: (input) => input.querylist === `View Employees by Department`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true; 
//                 } else {
//                     return `Please select which details you want to add`;
//                 }
//             }
//         },
//         {
//             type: `list`,
//             message: `Please enter the DepartmentID`,
//             name: `DepSBudgetId`,
//             choices: departments,
//             when: (input) => input.querylist === `View Department Salary Budget`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true; 
//                 } else {
//                     return `Please select which details you want to add`;
//                 }
//             }
//         },
//         // Maintain Data - Add, Change, Delete
//         {
//             type: `list`,
//             message: `Please select function`,
//             name: `functionlist`,
//             choices: [`Add details`,`Update details`,`Delete details`],
//             when: (input) => input.menu === `Maintain Data`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select query to run`;
//                 }
//             }
//         },
//         // Adding
//         {
//             type: `list`,
//             message: `Please select the details you want to add`,
//             name: `adding`,
//             choices: [`Department`,`Employee Role`,`Employee`],
//             when: (input) => input.functionlist === `Add details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select which details you want to add`;
//                 }
//             }
//         },
//         // Adding new Department
//         {
//             type: `input`,
//             name: `addDept`,
//             message: `What is the name of the department ?`,
//             when: (input) => input.adding === "Department" && input.functionlist === `Add details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please enter the name of the department`;
//                 }
//             }
//         },
//         // Adding new Employee Role
//         {
//             type: `input`,
//             name: `addRole`,
//             message: `What is the name or title of the role ?`,
//             when: (input) => input.adding === "Employee Role" && input.functionlist === `Add details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please enter the name of the role`;
//                 }
//             }
//         },
//         {
//             type: `list`,
//             name: `addIsManager`,
//             message: `Is this new role a manager's position?`,
//             choices: [`Yes`,`No`],
//             when: (input) => input.adding === "Employee Role" && input.functionlist === `Add details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select YES/NO to indcate if the role is a manager's role`;
//                 }
//             }
//         },
//         {
//             type: `input`,
//             name: `salary`,
//             message: `What is the budgeted salary for the role?`,
//             when: (input) => input.adding === "Employee Role" && input.functionlist === `Add details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please enter the budgeted salary for the role`;
//                 }
//             }
//         },
//         {
//             type: `list`,
//             name: `EmpDeptId`,
//             message: `In which department is this role allocated?`,
//             choices: departments,
//             when: (input) => input.adding === "Employee Role" && input.functionlist === `Add details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select the department this role belongs to`;
//                 }
//             }
//         },
//         // Adding new Employee
//         {
//             type: `input`,
//             name: `firstName`,
//             message: `What is the employee's name?`,
//             when: (input) => input.adding === "Employee" && input.functionlist === `Add details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please enter the budgeted salary for the role`;
//                 }
//             }
//         },
//         {
//             type: `input`,
//             name: `lastName`,
//             message: `What is the emploee's surname?`,
//             when: (input) => input.adding === "Employee" && input.functionlist === `Add details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please enter the budgeted salary for the role`;
//                 }
//             }
//         },

//         {
//             type: `list`,
//             name: `addempRole`,
//             message: `What role is this new employee assuming?`,
//             choices: employeerolechoices,
//             when: (input) => input.adding === "Employee Role" && input.functionlist === `Add details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select the new emploee's role`;
//                 }
//             }
//         },

//         {
//             type: `list`,
//             name: `addempManager`,
//             message: `Who is the manager's this role is reporitng too?`,
//             choices: manageremployees,
//             when: (input) => input.adding === "Employee Role" && input.functionlist === `Add details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select YES/NO to indcate if the role is a manager's role`;
//                 }
//             }
//         },


//         // changing employee details

//         {
//             type: `list`,
//             message: `Please select the details you want to change`,
//             name: `changing`,
//             choices: [`Employee Role`,`Employee Manager`],
//             when: (input) => input.functionlist === `Update details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select which details you want to add`;
//                 }
//             }
//         },

//         {
//             type: `input`,
//             message: `Please enter the Employee ID`,
//             name: `empId`,
//             when: (input) => input.changing === `Employee Role` && input.functionlist === `Update details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;//do a query to employees and see if id exists - error if not found, 
//                 } else {
//                     return `That employee ID does not exist - please enter a valid employee id`;
//                 }
//             }
//         },

//         {
//             type: `list`,
//             message: `Please select the employees new role/title`,
//             name: `empnewrole`,
//             choices: employeerolechoices,
//             when: (input) => input.changing === `Employee Role` && input.functionlist === `Update details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select which details you want to add`;
//                 }
//             }
//         },

//         {
//             type: `list`,
//             message: `Please select the employees new manager's name`,
//             name: `empnewman`,
//             choices: manageremployees,
//             when: (input) => input.changing === `Employee Manager` && input.functionlist === `Update details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select which details you want to add`;
//                 }
//             }
//         },
       
//         // deleting details

//         {
//             type: `list`,
//             message: `Please select the details you want to delete`,
//             name: `deleting`,
//             choices: [`Department`,`Employee Role`,`Employee`],
//             when: (input) => input.functionlist === `Delete details`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select which details you want to add`;
//                 }
//             }
//         },
       
//         {
//             type: `list`,
//             name: `delDept`,
//             message: `Which department are you deleting ?`,
//             choices: departments,
//             when: (input) => input.functionlist === `Delete details` && input.deleting === `Department`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select your team member's role`;
//                 }
//             }
//         },
       
//         {
//             type: `list`,
//             name: `delEmpRole`,
//             message: `Which role are you deleting ?`,
//             choices: employeerolechoices,
//             when: (input) => input.functionlist === `Delete details` && input.deleting === `Employee Role`,
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select your team member's role`;
//                 }
//             }
//         },

//         {
//             type: `input`,
//             name: `delEmp`,
//             message: `Which employee are you deleting ?`,
//             when: (input) => input.functionlist === `Delete details` && input.deleting === `Employee`,
            
//             validate: (value) => 
//             {
//                 if (value) {
//                     return true;
//                 } else {
//                     return `Please select your team member's role`;
//                 }
//             }
//         },

//         { 
//             type: `list`,
//             name: `newselection`,
//             choices: [`Yes`, `No`],
//             message: `Do you want to perform another action?`,
//             validate: (value) => 
//             {
//                 if (value) {
//                  console.log(value);
//                     return true;
//                 } else {
//                     return `Please make a selection`;
//                 }
//             }
//         },
//     ])
// };

// const init = () =>
// {
//     promptUser()
   
//     .then (answers => 
//     {   
//      console.log(answers);

//         switch(answers.menu)
//         {
//             case `Query Details`:

//                 switch(answers.querylist)
//                 {
//                     case `View Employees By Manager` :
//                         manageremployees(answers.ManId);
//                         break;
//                     case `View Employees by Department` :
//                         queryEmployeeByDept(answers.DepId);
//                         break;
//                     case `View Department Salary Budget` :
//                         queryDeptBudget(answers.DepSBudgetId);
//                         break;
//                 }
//             case `Maintain Details`:

//                 switch(answers.functionlist)
//                 {
//                     case `Add Details`:

//                         switch(answers.adding)
//                         {
//                             case `Department` :
//                                 postDepartment(answers.addDep);
//                                 break;
//                             case `Employee Role` :
//                                 postEmployeeRole(answers.addRole,answers.addIsManager,answers.salary,answers.EmpDeptId);
//                                 break;
//                             case `Employee` :
//                                 postEmployee(answers.firstName,answers.lastName,answers.eddEmpRole,answers.EmpManager);
//                                 break;
//                         }
//                     case `Update Details`:

//                         switch(answers.changing)
//                         {
//                             case `Employee Role`:
//                                 patchemployeeRole(answers.empId,answers.empnewrole);
//                                 break;
//                             case `Employee Manager` :
//                                 patchEmployeeManager(answers.empId,answers.empnewMan);
//                                 break;
//                         }

//                     case `Delete Details`:
//                     {
//                         switch(answers.deleting)
//                         {
//                             case `Department` :
//                                 deleteDepartment(answers.delDept);
//                                 break;
//                             case `Employee Role` :
//                                 deleteEmployeeRole(answers.delEmpRole);
//                                 break;
//                             case `Employee` :
//                                 deleteEmployee(answers.delEmp);
//                                 break;
//                         }
//                     }
//                 }
            
//             }
//         switch(answers.newselection){
//             case `Yes`: init();
//             break;
//             case `No` : // show data/result
//             } 
//         }
//     )
//     .catch ((error) => 
//     {
//         if (error) {
//          console.log (`Error in environments`,error);
//         }
//     })
// }


