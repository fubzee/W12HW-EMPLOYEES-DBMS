const console = require(`console`);
const inquirer = require(`inquirer`);
const table = require(`console.table`);
const choices = require(`inquirer/lib/objects/choices`);//?
const express = require('express');
const mysql = require('mysql2');
const { initial } = require("lodash");
const { id } = require('prelude-ls');
const { Console } = require('console');
const { init } = require('express/lib/application');
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
// Global Variables:
var departments = ``;
var employerrolechoice = ``;
var manageremployees = ``;
var allemployees = ``;

function Start() {
    new Promise ((results,reject) => queryalldepartments().then 
    (new Promise((results,reject) => queryallroles().then 
    (new Promise((results,reject) => querymanageremployees().then
    (new Promise((results,reject) => queryallemployees().then
    (MainMenu()))))))))};


const MainMenu = async () => {      
    const mainselect = await inquirer.prompt ([{ 
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
    }])
    .then (async (answers) => {
        switch (answers.menu) {
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
                console.log("Exiting Application");
                process.exit(0);
        }
    })
};

const selectAddMenuItems = async () => {      
    const addSelect = await inquirer.prompt ([
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
                MainMenu();
                break;
        }
    }
)};
const selectReadMenuItems = async () => 
{      
    const querySelect = await inquirer.prompt ([
        { 
            type: `list`,
            name: `querymenu`,
            message: `What would you like to query ?`,
            choices: [  `View all Departments`,
                        `View all Roles`,
                        'View all Managers',
                        `View all Employees`,
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
                console.log('Departments');
                console.table(departments);
                selectReadMenuItems();
                break;
            case `View all Roles`:
                console.table(employerrolechoice);
                selectReadMenuItems();
                break;
            case `View all Employees`:
                console.table(allemployees);
                selectReadMenuItems();
             break;
            case `View all Managers`:
                console.table(manageremployees);
                selectReadMenuItems();
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
    const updateSelect = await inquirer.prompt ([
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
    const deleteSelect = await inquirer.prompt ([
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

async function queryallroles() {
    const db = sqldb;
    return new Promise ((results, reject) => {
      db.promise().query('SELECT * from emp_role').then(([rows,fields]) => { 
            employerrolechoice = rows;
        })
    });
};

async function querymanageremployees() {
    const db = sqldb;
    return new Promise ((results, reject) => {
    db.promise().query(`SELECT employee.id, employee.first_name,employee.last_name FROM emp_role RIGHT JOIN employee on employee.role_id = emp_role.id where emp_role.manager = true`)
    .then(([rows,fileds]) => { 
        manageremployees = rows;
     });
  });
};

async function queryalldepartments() {
    const db = sqldb;
    return new Promise((results, reject) => {
      db.promise().query(`SELECT * from department`).then( ([rows,fields]) => { 
        departments = rows;
      });
    });
};
       
async function queryallemployees() {
    const db = sqldb;
    return new Promise((results, reject) => {
      db.promise().query(`SELECT * from employee`).then( ([rows,fields]) => { 
        allemployees = rows;
      });
    });
};



async function nextAddAction() {
    const newOption = await inquirer.prompt([{
        type: `list`,
        name: `nextAction`,
        message: `Return to Create/Add more Items or Return to Main Menu ?`,
        choices: [`Main Menu`, `Add More Items`],
        validate: (value_1) => {
            if (value_1) {
                return true;
            } else {
                return `Please select your next action`;
            }
        }
    }]);
    switch (newOption.nextAction) {
        case `Main Menu`:
            MainMenu();
            break;

        case `Add More Items`:
            selectAddMenuItems();
            break;
    };
};

async function nextQueryAction() {
    const newQOption = await inquirer.prompt([{
        type: `list`,
        name: `nextQAction`,
        message: `Return to Create/Add more Items or Return to Main Menu ?`,
        choices: [`Main Menu`, `Another Query`],
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please enter the name of the department`;
            }
        }
        }]);
    switch (newQOption.nextQAction) {
        case `Main Menu`:
            MainMenu();
            break;

        case `Another Query`:
            selectReadMenuItems();
            break;
    }
};

async function nextUpdateAction()
{
    const newUOption = await inquirer.prompt([
        {
            type: `list`,
            name: `nextUAction`,
            message: `Return to Update more Items or Return to Main Menu ?`,
            choices: [`Main Menu`, `Another Update`],
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return `Please select your next action`;
                }
            }
        },
    ]);
    switch (newUOption.nextUAction) {
        case `Main Menu`:
            MainMenu();
            break;

        case `Another Update`:
            selectUpdateMenuItems();
            break;
    }
};

async function nextDeleteAction() {
    const newUOption = await inquirer.prompt([{
            type: `list`,
            name: `nextDAction`,
            message: `Return to Delete more Items or Return to Main Menu ?`,
            choices: [`Main Menu`, `Another Update`],
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return `Please select your next action`;
                }
            }
        },
    ]);
    switch (newUOption.nextDAction) {
        case `Main Menu`:
            MainMenu();
            break;

        case `Another Update`:
            selectDeleteMenuItems();
            break;
    }
};
async function insertDepartment() {
    const db = sqldb;
    return inquirer.prompt ([        {
        type: `input`,
        name: `addDept`,
        message: `What is the name of the department ?`,
        validate: (value) =>         {
            if (value) {
                return true;
            } else {
                return `Please enter the name of the department`;
            }
        }
    },
])
.then( async (answer) =>     {
        let newDept = answer.addDept;
        return new Promise ((results, reject) =>         {
            db.promise().query(`INSERT INTO department (dept_name) VALUES (?)`,[newDept])
            .then( ([rows,fields]) => {
                console.log(`New Department Created`)
                queryalldepartments()
            })
            .then((results) => {
                nextAddAction();
            });
        });
    })
};
async function insertEmployeeRole() {
    const db = sqldb;
    const deptlist = departments.map((departments) => {
        return { name: departments.dept_name, value : departments.id};
    });
    return inquirer.prompt ([{
        type: `input`,
        name: `addRole`,
        message: `What is the name or title of the role ?`,
        validate: (value) => {
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
        validate: (value) => {
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
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please enter the budgeted salary for the role`;
            }
        }
    },
    {
        type: `list`,
        name: `EmpDeptId`,
        message: `In which department is this role allocated?`,
        choices: deptlist,
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please select the department this role belongs to`;
            }
        }
    },
])
.then((answer) => {
        let newRole = answer.addRole;
        switch (answer.addIsManager){
            case 'Yes': isManager = 1;
            break;
            case 'No': isManager = 0;
        }
        let addsalary = answer.salary;
        let roledept = answer.EmpDeptId;
        return new Promise ((results, reject) => {
            db.promise().query(`INSERT INTO emp_role (title, manager,salary,dept_id) VALUE (?,?,?,?)`,[newRole,isManager,addsalary,roledept])
            .then( ([rows,fields]) => {
                console.log(`New Role Created`)
                queryallroles();
            })
            .then((results) => {
                nextAddAction();
            });
        });
    });
};

async function insertEmployee() {
    const db =  sqldb;
    const managerlist = manageremployees.map((manageremployees) => {
        return { name:manageremployees.first_name + ' ' + manageremployees.last_name , value : manageremployees.id};
    })
    const rolelist = employerrolechoice.map((employerrolechoice) => {
        return { name: employerrolechoice.title, value : employerrolechoice.id};
    });
    return inquirer.prompt ([{
        type: `input`,
        name: `firstName`,
        message: `What is the employee's name?`,
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please enter the budgeted salary for the role`;
            }
        }
    },
    {
        type: `input`,
        name: `lastName`,
        message: `What is the employee's surname?`,
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please enter the budgeted salary for the role`;
            }
        }
    },
    {
        type: `list`,
        name: `addempRole`,
        message: `What role is this new employee assuming?`,
        choices: rolelist,
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please select the new employee's role`;
            }
        }
    },
    {
        type: `list`,
        name: `addIsManager`,
        message: `Does this employee report into a Manager?`,
        choices: [`Yes`,`No`],
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please select YES/NO `;
            }
        }
    },
    {
        type: `list`,
        name: `addempManager`,
        message: `Who is the manager's this role is reporting too?`,
        when: (answers) => answers.addIsManager === 'Yes',
        choices: managerlist,
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please select YES/NO to indcate if the role is a manager's role`;
            }
        }
    },
])
.then((answer) => {
        let firstName = answer.firstName;
        let lastName = answer.lastName
        let empRole =  answer.addempRole;
        let empManager = answer.addempManager;
        return new Promise ((results, reject) => {
            db.promise().query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUE (?,?,?,?)`,[firstName,lastName,empRole,empManager])
            .then( ([rows,fields]) => {
                console.log(`New Employee Created`)
                queryallemployees();
                querymanageremployees();
            })
            .then((results) => {
                nextAddAction();
            });
        });
    });
};

async function Updateemployeerole() {
    const db = sqldb;

    const rolelist = employerrolechoice.map((employerrolechoice) => {
        return { name: employerrolechoice.title, value : employerrolechoice.id};
    });
    const emplist = allemployees.map((allemployees) => {
        return { name: allemployees.first_name + ' ' + allemployees.last_name, value : allemployees.id};
    });
    return inquirer.prompt ([{
        type: `list`,
        message: `Please select the employee`,
        name: `empId`,
        choices: emplist,
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please select the employee you want to amend`;
            }
        }
    },
    {
        type: `list`,
        message: `Please select the employees new role/title`,
        name: `empnewrole`,
        choices: rolelist,
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please select which role you want to select`;
            }
        }
    },
])
.then((answer) => {
        let Updid = answer.empId;
        let UpdRole = answer.empnewrole;
        return new Promise ((results, reject) => {
            db.promise().query('UPDATE employee SET role_id = ? WHERE Id = ?',[UpdRole,Updid])
            .then( ([rows,fields]) => {
                console.log(`Employee Role Changed`)
                queryallemployees()
            })
            .then((results) => {
                nextUpdateAction()
            });
        });
    });
};

async function UpdateEmployeeManager() {
    const db = sqldb;
    const emplist = allemployees.map((allemployees) => {
        return { name: allemployees.first_name + ' ' + allemployees.last_name, value : allemployees.id};
    });
    const managerlist = manageremployees.map((manageremployees) => {
        return { name:manageremployees.first_name + ' ' + manageremployees.last_name , value : manageremployees.id};
    })
    return inquirer.prompt ([
    {
        type: `list`,
        message: `Please select the employee`,
        name: `empId`,
        choices: emplist,
        validate: (value) => 
        {
            if (value) {
                return true; 
            } else {
                return `Please select the employee you want to change`;
            }
        }
    },
    {
        type: `list`,
        message: `Please select the employees new manager's name`,
        name: `empnewman`,
        choices: managerlist,
        validate: (value) => 
        {
            if (value) {
                return true;
            } else {
                return `Please select the new manager'name`;
            }
        }
    },
])
.then((answer) => {
        let Updid = answer.empId;
        let UpdManager = answer.empnewman;
        return new Promise ((results, reject) => {
            db.promise().query('UPDATE employee SET manager_id = ? WHERE Id = ?',[UpdManager, Updid])
            .then( ([rows,fields]) => {
                console.log(`Employee Manager Changed`)
                queryallemployees()
            })
            .then((results) => {
                nextUpdateAction()
            });
        });
    });
};
async function queryEmployeesByManager() {
    const db = sqldb;
    const managerlist = manageremployees.map((manageremployees) => {
    return { name: manageremployees.first_name + ' ' + manageremployees.last_name, value : manageremployees.id};
    })
    return inquirer.prompt ([{
        type: `list`,  
        message: `Please select the manager`,
        name: `ManId`,
        choices: managerlist,
        validate: (value) => {
            if (value) {
                return true; 
            } else {
                return `Please select which details you want to add`;
            }
        }
    },
    ])
    .then((answer) => {
            let managerid = answer.ManId;
            return new Promise ((results, reject) => {
                db.promise().query(`SELECT * FROM employee WHERE manager_id = ?`,[managerid])
                .then(([rows,fields]) => {
                    console.table(rows);
                })
            .then((results) => {
                nextQueryAction()
            });
        });
    });    
};

async function queryEmployeeByDept() {
    const db = sqldb;
    const deptlist = departments.map((departments) => {
        return { name: departments.dept_name, value : departments.id};
    });
    return inquirer.prompt ([{
        type: `list`,  
        message: `Please select the department`,
        name: `DeptId`,
        choices: deptlist,
        validate: (value) => {
            if (value) {
                return true; 
            } else {
                return `Enter a department to continue`;
            }
        }
    }])
    .then((answer) => {
        let deptid = answer.DeptId;
        return new Promise ((results, reject) => {
            db.promise().query(`SELECT * FROM department RIGHT JOIN emp_role on emp_role.dept_id = department.id RIGHT JOIN employee on employee.role_id = emp_role.id where department.id = ?`,[deptid])
            .then( ([rows,fields]) => {
                    console.table(rows);
            })
            .then((results) => {
                nextQueryAction()
            });
        });
    });
};   
async function queryDeptBudget() {
    const db = sqldb;
    const deptlist = departments.map((departments) => {
        return { name: departments.dept_name, value : departments.id};
    });
    return inquirer.prompt ([{
        type: `list`,  
        message: `Please select the department`,
        name: `DeptId`,
        choices: deptlist,
        validate: (value) => {
            if (value) {
                return true; 
            } else {
                return `Please select the department you want to view`;
            }
        }
    }])
    .then((answer) => 
    {
        let deptid = answer.DeptId;
        return new Promise ((results, reject) => {
            db.promise().query('SELECT department.dept_name, SUM(emp_role.salary) FROM department RIGHT JOIN emp_role on emp_role.dept_id = department.id RIGHT JOIN employee on employee.role_id = emp_role.id where department.id = ? GROUP BY department.id',[deptid])
            .then( ([rows,fields]) => {
                console.table(rows);
            })
            .then((results) => {
                nextQueryAction()
            });
        }); 
    });
};

async function deleteDepartment() {
    const db = sqldb;
    const deptlist = departments.map((departments) => {
        return { name: departments.dept_name, value : departments.id};
    });
    return inquirer.prompt ([{
        type: `list`,
        name: `delDept`,
        message: `Which department are you deleting ?`,
        choices: deptlist,
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please select the department being deleted`;
            }
        }
    },
])
.then((answer) => 
    {
        let deptid = answer.delDept;

        return new Promise ((results, reject) => {
            db.promise().query('DELETE FROM department WHERE id = ?;',[deptid])
            .then( ([rows,fields]) => {
                console.log(`Record deleted`)
                queryalldepartments()
                queryallroles()
            })
            .then((results) => {
                nextDeleteAction()
            });
        });
    })
};

async function deleteEmployeeRole() {
    const db = sqldb;
    const rolelist = employerrolechoice.map((employerrolechoice) => {
        return { name: employerrolechoice.title, value : employerrolechoice.id};
    });
    return inquirer.prompt ([{
        type: `list`,
        name: `delEmpRole`,
        message: `Which role are you deleting ?`,
        choices:rolelist,
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please select your role that is being deleted`;
            }
        }
    }
])
.then((answer) => 
    {
        let roleid = answer.delEmpRole;
        return new Promise ((results, reject) => {
            db.promise().query(`DELETE FROM emp_role WHERE id = ?;`,[roleid])
            .then( ([rows,fields]) => {
                    console.log(`Record deleted`)
                    queryallroles()
                    queryallemployees()
                })
            .then((results) => {
                nextDeleteAction()
            });
        });
    });
};

async function deleteEmployee() {
    const db = sqldb;

    const emplist = allemployees.map((allemployees) => {
        return { name: allemployees.first_name + ' ' + allemployees.last_name, value : allemployees.id};
    });
    return inquirer.prompt ([{
        type: `list`,
        name: `delEmp`,
        message: `Which employee are you deleting ?`,
        choices: emplist,
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return `Please select which employee to be deleted`;
            }
        }
    },
])
.then((answer) => {
        let delemp = answer.delEmp;
        return new Promise ((results, reject) => {
            db.promise().query(`DELETE FROM employee WHERE id = ?`,[delemp])   
            .then( ([rows,fields]) => {
                    console.log(`Record deleted`)
                    querymanageremployees()
                    queryallemployees()
            })
            .then((results) => {
                nextDeleteAction()
            });
        });
    });
};

Start()
