const Task =require('./../models/TaskSchema');
const Employee = require('./../models/Employee');
const catchAsync = require('./../utils/catchAsync');

const Task = require('../models/TaskSchema');

// Get all tasks
// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// Get task by ID
exports.getEmployeeByTaskId = catchAsync(async (req, res) => {

      const { taskId } = req.params;
      const task = await Task.findById(taskId).populate('employeeID');

      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      
      res.status(200).json({employeeID: task.employeeID});
  });

exports.getTaskById = catchAsync(async (req, res) => {
 
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
          task: task
        }
      });
});

// Create a new task
exports.createTask = catchAsync(async (req, res) => {
    const { title, projectID, employeeID, status, dueDate } = req.body;
    const newTask = new Task({ title, projectID, employeeID, status, dueDate });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: newTask });
});

// Update task by ID
exports.updateTaskById = catchAsync(async (req, res) => {
    const { taskId } = req.params;
    const { title, projectID, employeeID, status, dueDate } = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, projectID, employeeID, status, dueDate }, { new: true });
    
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json({ message: "Task updated successfully", task: updatedTask });
});

// Delete task by ID
exports.deleteTaskById = catchAsync(async (req, res) => {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json({ message: "Task deleted successfully" });
});