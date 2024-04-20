const express=require('express');
const router=express.Router();
const TaskController=require('./../controllers/TaskController')

router.get('/getTask',TaskController.getTaskById);
router.post('/createTask',TaskController.createTask);
router.delete('/deleteTask',TaskController.deleteTaskById);
router.patch('/updateTask',TaskController.updateTaskById);
router.get('/getTaskEmployee',TaskController.getTaskEmployee);


module.exports=router;