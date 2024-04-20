const express=require('express');
const projectController=require('./../controllers/ProjectController')

const router=express.Router();

router.get('/allProjects',projectController.getAllProjects);
router.post('/createProject',projectController.createProject);
router.delete('/deleteProject',projectController.deleteProject);
router.get('/getProject',projectController.getProject);
router.get('/getEmployees',projectController.getEmployees);
router.get('/getTasks',projectController.getTasks);


module.exports=router;