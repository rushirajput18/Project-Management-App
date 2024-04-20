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
      required: true
    },
    employeeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'],
      default: 'To Do'
    },
    dueDate: {
      type: Date,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    CompletedAt: {
      type: Date,
    }
  });