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
    const project_id = req.body.projectId;

    if (!project_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Project ID is required.'
      });
    }

    const tasks = await Task.find({ projectID: project_id });

    res.status(200).json({
      status: 'success',
      data: {
        tasks: [] 
      }
    });
});



  