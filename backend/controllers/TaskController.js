// const Task =require('./../models/TaskSchema');
const Employee = require('./../models/EmployeeSchema');
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
exports.getTaskByStatus = catchAsync(async(req,res)=>{
  const {status} = req.body.status;
  const tasks = await Task.find({status});
  res.status(200).json(tasks);
})

exports.countTask = catchAsync(async (req, res) => {
  const count = await Task.countDocuments({ status: { $ne: 'Done' } });

  res.status(200).json({ taskCount:count });
})

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
exports.updateTaskBytitle = catchAsync(async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    task.CompletedAt = new Date();
    const updatedTask = await task.save();
    res.json({ message: 'Task status updated successfully', task });
    console.log("sjfds")
    const employee = await Employee.findOne({ _id: task.employeeID }); // Await the execution of the query
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
  
    const btime = (updatedTask.dueDate- updatedTask.CompletedAt ) / (updatedTask.dueDate - updatedTask.createdAt);
  
    employee.BestTime = employee.BestTime + btime;
    const updatedEmployee = await employee.save();
    res.json({ message: "Task updated successfully", task: updatedTask });
} catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
}

});
exports.updateTaskById = async (req, res) => {
  try {
      const {id} = req.params;
      const {status}  = req.body ;

      const task = await Task.findByIdAndUpdate(id, { status:status }, { new: true });

      if (!task) {
        console.log(id);
        console.log({status:status});
          return res.status(404).json({ message: 'Task not found' });
      }

      res.json({ message: 'Task status updated successfully', task });
  } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
  }
};

// Delete task by ID
exports.deleteTaskById = catchAsync(async (req, res) => {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json({ message: "Task deleted successfully" });
});