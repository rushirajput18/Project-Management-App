const express=require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app=require('./app')
dotenv.config({ path: './.env' });

//code to connect to mongoose database

// console.log(process.env.DATABASE);
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log('DB connection established')});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});