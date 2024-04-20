const Employee = require("../models/EmployeeSchema");
const Task = require("../models/TaskSchema");


// Controller for employee registration
exports.registerEmployee = async (req, res) => {
  try {
    const { name, email, password, BestTime } = req.body;
    // Check if the email is already registered
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Create a new employee document
    const newEmployee = new Employee({
      name,
      email,
      password,
      BestTime,
    });
    await newEmployee.save();

    res.status(201).json({ message: "Employee registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for employee login
exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if the provided password matches with the stored password
    if (employee.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Login successful, send employee details
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Controller to get a single employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { id} = req.params;
    const employee = await Employee.findById(id);
    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
// Find the employee by ID and delete it
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get tasks of a particular employee for a project
exports.getEmployeeTasks = async (req, res) => {
  try {
    const { employeeId, projectId } = req.params;
    const tasks = await Task.find({
      employeeID: employeeId,
      projectID: projectId,
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
