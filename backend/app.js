const express = require('express')
const cors = require('cors');
const ProjectRouter=require('./routes/ProjectRoutes');
const EmployeeRouter=require('./routes/Employee');
const TaskRouter=require('./routes/TaskRoutes');

const bodyParser = require('body-parser');
const app= express();
app.use(cors());
app.use(bodyParser.json())
app.use('/project',ProjectRouter);
app.use('/task',TaskRouter);
app.use('/employee',EmployeeRouter);

module.exports= app;
