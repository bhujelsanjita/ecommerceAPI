const express = require('express');
const DataBase = require('../config/dbconfig');
const sequelize = require('sequelize');

const Customer = DataBase.define('Customer',{
    CustomerID:{
        type: sequelize.INTEGER,
        allowNUll:false,
        primarykey: true
    },
    CustomerName:{
        type:sequelize.STRING,
        allowNUll:false
    },
    CustomerLogin:{
        type:sequelize.STRING,
        allowNUll: false
    },
    CompanyName:{
        type:sequelize.STRING,
        allowNUll:true
    }

})
module.exports = Customer;