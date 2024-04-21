const express=require('express');
const router=express.Router();
const TaskController=require('./../controllers/TaskController')

router.get('/getTask',TaskController.getTaskById);
router.post('/createTask',TaskController.createTask);
router.delete('/deleteTask',TaskController.deleteTaskById);
router.patch('/updateTask',TaskController.updateTaskById);
router.get('/getTaskEmployee',TaskController.getEmployeeByTaskId);
router.get('/countTask',TaskController.countTask);
router.get('/getTaskByStatus',TaskController.getTaskByStatus)


module.exports=router;