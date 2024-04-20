const mongoose = require('mongoose')
const Employee = require('./EmployeeSchema')

const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Assigned', 'In Process', 'Completed'],
        default: 'Assigned'
      },
      employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee' 
    }],
    leader:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },  
    StartDate: {
        type: Date,
        default: Date.now
    },
    EndDate: {
        type: Date
    }
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project