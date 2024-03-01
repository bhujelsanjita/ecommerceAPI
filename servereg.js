// this is entry point all request go through this file
const express = require('express');
const app = express();
const Routes = require('./routes');
const Env = require('dotenv');//inside '' write package name
Env.config();//to access all the values
const port = process.env.PORT;
app.use(Routes);
app.listen(port,()=>{
    console.log("Server is running")
})
