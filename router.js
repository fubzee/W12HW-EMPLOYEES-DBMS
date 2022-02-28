const db = require(`./js/server-promises`);
const express = require('express');
const api = express.Router();
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(PORT, () => console.log ("server currently running on port ${PORT}"));


// api.get(`/departments`, async (req, res) => 
// {
//     try 
//     {
        
async function getDepartment() {
    const departments = async () => await db.getDepartment();
        res.status(200).json({elements: departments});
}
//     }
//     catch (err)
//     {
//         console.log (err);
//         res.sendStatus(500);
//     }
//     console.log(departments);
// });

api.get(`/EmployeeRole`, async (req, res) => 
{
    try 
    {
        const EmpRoleResults = await db.getEmployeeRole();
        res.status(200).json({elements: EmpRoleResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(EmpRoleResults);
});

api.get(`EmployeeRoleTitle`, async (req, res) => 
{
    try 
    {
        const [EmpTitleResults] = await db.getEmployeeRoleTitle();
        res.status(200).json({elements: EmpTitleResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(EmpTitleResults);
});

api.get(`/Employee`, async (req, res) => 
{
    try 
    {
        const employee = await db.getEmployee(); 
        res.status(200).json({elements: employee});
    
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(employee);
});

api.post('/Department', async (req,res) =>
{
    try 
    {
        const name = req.body.department.name;
        const postDepartmentResults = await db.insertDepartment(name);
        res.status(200).json({elements: postDepartmentResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(postDepartmentResults);
});

api.post('/postEmployeeRole', async (req,res) =>
{
    try 
    {
        const addRole = req.body.addRole;
        const addIsManager = req.body.addIsManager;
        const salary = req.body.salary;
        const EmpDeptId = req.body.EmpDeptId;
        const postEmployeeRoleResults = await db.insertEmployeeRole(addRole,addIsManager,salary,EmpDeptId);
        res.status(200).json({elements: postEmployeeRoleResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(postEmployeeRoleResults);
});

api.delete('/Department', async (req,res) =>
{
    try 
    {
        const delDept = req.body.delDept;
        const deleteDepartmentResults = await db.deleteDepartment (delDept);
        res.status(200).json({elements: deleteDepartmentResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(deleteDepartmentResults);
});

api.post('/postEmployee', async (req,res) =>
{
    try 
    {
        const firstName = req.body.addRole;
        const lastName = req.body.addIsManager;
        const addEmpRole = req.body.salary;
        const EmpManager = req.body.EmpManager;
        const postEmployeeResults = await db.insertEmployeeRole(firstName,lastName,addEmpRole,EmpManager);
        res.status(200).json({elements: postEmployeeResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(postEmployeeResults);
});

api.delete('/deleteEmployee', async (req,res) =>
{
    try 
    {
        const delEmp = req.body.delEmp;
        const deleteEmployeeResults = await db.deleteDepartment (delEmp);
        res.status(200).json({elements: deleteEmployeeResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(deleteEmployeeResults);
});

api.delete('/deleteEmployeeRole', async (req,res) =>
{
    try 
    {
        const delEmpRole = req.body.delEmpRole;
        const deleteEmployeeRoleResults = await db.deleteDepartment (delEmpRole);
        res.status(200).json({elements: deleteEmployeeRoleResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(deleteEmployeeRoleResults);
});

api.delete('/getEmployeeById', async (req,res) =>
{
    try 
    {
        const id = req.body.id;
        const getEmployeeById = await db.getEmployeeById(id);
        res.status(200).json({elements: getEmployeeById});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(getEmployeeById);
});

api.put('/Updateemployeerole', async (req,res) =>
{
    try 
    {
        const empId = req.body.empId;
        const empnewrole = re.body.empnewrole;
        const patchemployeeRoleResults = await db.Updateemployeerole(empnewrole,empId);
        res.status(200).json({elements: patchemployeeRoleResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(patchemployeeRoleResults);
});

api.put('/UpdateEmployeeManager', async (req,res) =>
{
    try 
    {
        const empId = req.body.empId;
        const empnewMan = re.body.empnewMan;
        const patchEmployeeResults = await db.UpdateEmployeeManager(empId,empnewMan);
        res.status(200).json({elements: patchEmployeeResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(patchEmployeeResults);
});

api.get('/manageremployees', async (req,res) =>
{
    try 
    {
        const ManId = req.body.ManId;
        
        const manageremployeesResults = await db.UpdateEmployeeManager(ManId);
        res.status(200).json({elements: manageremployeesResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(manageremployeesResults);
});

api.get('/manageremployeeslist', async (req,res) =>
{
    try 
    {
        const manageremployeesListResults = await db.manageremployeeslist();
        res.status(200).json({elements: manageremployeesListResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(manageremployeesListResults);
});

api.get('/queryEmployeeByDept', async (req,res) =>
{
    try 
    {
        const id = req.body.Id
        const queryEmployeeByDeptResults = await db.queryEmployeeByDept(id);
        res.status(200).json({elements:queryEmployeeByDeptResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(queryEmployeeByDeptResults);
});

api.get('/queryDeptBudget', async (req,res) =>
{
    try 
    {
        const id = req.body.Id
        const queryDeptBudgetResults = await db.queryDeptBudget(id);
        res.status(200).json({elements:queryDeptBudgetResults});
    }
    catch (err)
    {
        console.log (err);
        res.sendStatus(500);
    }
    console.log(queryDeptBudgetResults);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

  module.exports = api;

