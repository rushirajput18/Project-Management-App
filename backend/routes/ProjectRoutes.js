const express=require('express');
const projectController=require('./../controllers/ProjectController')

const router=express.Router();

router.get('/allProjects',projectController.getAllProjects);
router.post('/createProject',projectController.createProject);
router.delete('/deleteProject',projectController.deleteProject);
router.get('/getProject/:project_id',projectController.getProject);
router.get('/getEmployees',projectController.getEmployees);
router.get('/getTasks/:id',projectController.getTasks);
router.get('/PieChart',projectController.getPieChartData);


module.exports=router;