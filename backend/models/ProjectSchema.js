const mongoose = require('mongoose')
const Employee = require('./EmployeeSchema')

const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    status: {
        type: String,
        enum: ['Assigned', 'In Progress', 'Completed'],
        default: 'Assigned'
      },
      employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee' 
    }],
    leader:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
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