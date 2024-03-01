const dotenv = require('dotenv');
const express = require('express');
const Router = require('./routes');
const sequelize = require('sequelize');
const dbconfig = require('./config/dbconfig');
const bodyparser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken')
dotenv.config();
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(Router);
app.use(cors());
const PORT = process.env.PORT || 2500;
dbconfig.sync({force:false}).then((connection)=>{
    console.log("database connection established");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
    
    
}).catch((err)=>{
    console.log('error in database connection');
    
})

