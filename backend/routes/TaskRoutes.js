const express=require('express');
const router=express.Router();
const TaskController=require('./../controllers/TaskController')
router.get('/getTask/:taskId',TaskController.getTaskById);
router.post('/createTask',TaskController.createTask);
router.delete('/deleteTask',TaskController.deleteTaskById);
router.patch('/updateTask',TaskController.updateTaskBytitle);
router.patch('/updateTaskStatus/:id',TaskController.updateTaskById);
router.get('/getTaskEmployee',TaskController.getEmployeeByTaskId);
router.get('/countTask',TaskController.countTask);
router.get('/getTaskByStatus',TaskController.getTaskByStatus)
// router.get('/getTotalTasks',TaskController.getTotalTasks)


module.exports=router;