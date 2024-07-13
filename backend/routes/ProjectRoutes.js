const express=require('express');
const projectController=require('./../controllers/ProjectController')

const router=express.Router();

router.get('/allProjects',projectController.getAllProjects);
router.post('/createProject',projectController.createProject);
router.delete('/deleteProject',projectController.deleteProject);
router.get('/getProject/:project_id',projectController.getProject);
router.get('/getEmployees',projectController.getEmployees);
router.get('/getEmployeesForTasks',projectController.getEmployeesForTasks);
router.get('/getTasks/:id',projectController.getTasks);
router.get('/PieChart',projectController.getPieChartData);
router.put("/UpdateStatus/:id/todo",projectController.UpdateStatus,);
router.get("/countProjects",projectController.countProjects);

module.exports=router;