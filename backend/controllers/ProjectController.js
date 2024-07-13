const Project=require('./../models/ProjectSchema');
const Employee=require('./../models/EmployeeSchema');
const Task=require('./../models/TaskSchema');
const catchAsync = require('./../utils/catchAsync');


exports.UpdateStatus = catchAsync(async (req, res) => {
      const projectId = req.params.id;
      const stages = req.body;

      const updates = [];

      for (const stageName in stages) {
        const items = stages[stageName].items;
        const stage = stageName;

        for (const item of items) {
          const taskId = item._id;
          const order = items.indexOf(item);

          updates.push({
            filter: { _id: projectId, "task._id": taskId },
            update: { $set: { "task.$.order": order, "task.$.stage": stage } },
          });
        }
      }

      const updateOperations = updates.map((update) => {
        return Task.updateOne(update.filter, update.update);
      });

      await Promise.all(updateOperations);

      res.json({ message: "Todo list updated successfully" });
})

exports.createProject = catchAsync(async(req, res) => {
  try {
      const { title, description, employees, endDate, leader } = req.body;
      
      // Create the project
      const newProject = await Project.create({ title, description, employees, endDate, leader });      
      // Send response
      res.status(201).json({
          status: 'success',
          data: {
              project: newProject
          }
      });
  } catch (error) {
    console.log(error)
      // Handle errors
      res.status(400).json({
          status: 'fail',
          message: error.message
      });
  }
});


exports.getAllProjects = catchAsync(async (req, res) => {
      let query = {}; // Initialize an empty query object

      // Check if the status query parameter exists
      if (req.query.status) {
        query.status = req.query.status; // Set the status filter in the query object
      }

      // Fetch projects based on the query
      const projects = await Project.find(query).populate(["employees", "leader"]);

      res.status(200).json({
        status: "success",
        data: {
          projects: projects,
        },
      });
  });



exports.deleteProject = catchAsync(async (req, res) => {
    // Extract the project ID from the request body or query parameters
    const project_id = req.body.project_id || req.query.project_id;

    // Check if the project ID is provided
    if (!project_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Project ID is required.'
      });
    }

    // Find the project by ID and delete it
    await Project.findByIdAndDelete(project_id);

    // Send success response
    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully.'
    });

});

exports.getProject = catchAsync(async (req, res) => {
    
    const {project_id} = req.params;

    // Check if the project ID is provided
    if (!project_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Project ID is required.'
      });
    }

    // Find the project by ID
    const project = await Project.findById(project_id).populate(["employees","leader"]);

    // Check if project exists
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found.'
      });
    }

    // Send the project as a response
    res.status(200).json({
      status: 'success',
      data: {
        project: project
      }
    });
});


exports.getEmployeesForTasks = catchAsync(async (req, res) => {
  const project_id = req.query.project_id; // Use query parameter for GET requests
  console.log('Received project ID:', project_id);

  const project = await Project.findById(project_id).populate('employees');
  console.log('Project:', project);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  // Extract employee details from the populated field
  const employees = project.employees.map(employee => ({
    id: employee._id,
    name: employee.name,
    email: employee.email,
    image: employee.image,
    // Add more fields as needed
  }));

  res.status(200).json({
    status: 'success',
    data: {
      employees: employees
    }
  });
});



exports.getEmployees = catchAsync(async (req, res) => {
    const project_id = req.body.project_id; // Change this to match the key in your request body
    console.log('Received project ID:', project_id);

    const project = await Project.findById(project_id).populate('employees');
    console.log('Project:', project);

    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    // Extract employee details from the populated field
    const employees = project.employees.map(employee => ({
        id: employee._id,
        name: employee.name,
        email: employee.email,
        image: employee.image,
        // Add more fields as needed
    }));
    res.status(200).json({
        status: 'success',
        data: {
            employees: employees
        }
    });
});







exports.getTasks = catchAsync(async (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'id is required.'
    });
  }
  // Find the project with the provided title
  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({
      status: 'error',
      message: 'Project not found.'
    });
  }

  // Use the project ID to find tasks associated with that project
  const tasks = await Task.find({ projectID: project._id });

  res.status(200).json({
    status: 'success',
    data: {
      tasks: tasks
    }
  });
});



exports.getPieChartData= catchAsync(async (req, res) => {
  const result = await Task.aggregate([
    {
      $group: {
        _id: '$projectID', // Group by project ID
        totalTasks: { $sum: 1 },
        todoCount: { $sum: { $cond: [{ $eq: ['$status', 'To Do'] }, 1, 0] } },
        inProgressCount: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
        doneCount: { $sum: { $cond: [{ $eq: ['$status', 'Done'] }, 1, 0] } }
      }
    },
    {
      $project: {
        _id: 1,
        totalTasks: 1,
        todoPercentage: { $multiply: [{ $divide: ['$todoCount', '$totalTasks'] }, 100] },
        inProgressPercentage: { $multiply: [{ $divide: ['$inProgressCount', '$totalTasks'] }, 100] },
        donePercentage: { $multiply: [{ $divide: ['$doneCount', '$totalTasks'] }, 100] }
      }
    }
  ]);
  

    res.status(200).json(result);

})

  