const express = require("express");
const EmployeeRouter = require("./routes/Employee");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use("/employee", EmployeeRouter);
module.exports = app;
