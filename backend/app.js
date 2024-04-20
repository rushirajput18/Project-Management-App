const express = require('express')
const ProjectRouter=require('./routes/ProjectRoutes')

const bodyParser = require('body-parser');
const app= express();
app.use(bodyParser.json())
app.use('/project',ProjectRouter);

module.exports= app;
