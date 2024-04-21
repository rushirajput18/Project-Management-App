const mongoose = require('mongoose')
const Employee= require('./EmployeeSchema')
const Project=require('./ProjectSchema')
const TaskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    projectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    employeeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'],
      default: 'To Do'
    },
    dueDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    CompletedAt: {
      type: Date,
    }
  });

  const Task = mongoose.model('Task', TaskSchema);
  module.exports = Task;