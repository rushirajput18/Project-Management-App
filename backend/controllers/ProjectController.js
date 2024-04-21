const Project=require('./../models/ProjectSchema');
const Employee=require('./../models/EmployeeSchema');
const Task=require('./../models/TaskSchema');
const catchAsync = require('./../utils/catchAsync');



exports.createProject =catchAsync(async(req,res)=>{
        // console.log(req.body);
        const newProject = await Project.create(req.body);
        res.status(201).json({
        status: 'success',
        data: {
            project: newProject,
        },
        });
});

exports.getAllProjects = catchAsync(async (req, res) => {
      let query = {}; // Initialize an empty query object

      // Check if the status query parameter exists
      if (req.query.status) {
        query.status = req.query.status; // Set the status filter in the query object
      }

      // Fetch projects based on the query
      const projects = await Project.find(query).populate("employees");

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
    
    const project_id = req.body.project_id || req.query.project_id;

    // Check if the project ID is provided
    if (!project_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Project ID is required.'
      });
    }

    // Find the project by ID
    const project = await Project.findById(project_id).populate('employees');

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
  const title = req.body.title;

  if (!title) {
    return res.status(400).json({
      status: 'error',
      message: 'Title is required.'
    });
  }
  // Find the project with the provided title
  const project = await Project.findOne({ title: title });

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

  