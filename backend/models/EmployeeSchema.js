const mongoose=require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        // required:true
    },
    BestTime:{
        type:Date,
    }
});

const Employee=mongoose.model('Employee',EmployeeSchema);
module.exports = Employee;