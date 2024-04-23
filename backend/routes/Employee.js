const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/Employee");
 
// Route to get all employees
router.get("/employees", employeeController.getAllEmployees);
router.get("/employee/:id", employeeController.getEmployeeById);
router.delete("/employee/:id", employeeController.deleteEmployeeById);
router.get("/getTopEmployees",employeeController.getTopEmployees);
router.get("/getProjects/:eid", employeeController.getProject);
// Route to get tasks of a particular employee for a project
router.get(
  "/employees/:employeeId/tasks/:projectId",
  employeeController.getEmployeeTasks
);

router.post("/register", employeeController.registerEmployee);
router.post("/login", employeeController.loginEmployee);



module.exports = router;
