const express = require('express');
const DataBase = require('../config/dbconfig');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt')
// const { Hooks } = require('sequelize/types/hooks');


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
    CustomerEmail:{
        type:sequelize.STRING,
        allowNUll: false
    },
    CustomerPassword:{
        type:sequelize.STRING,
        allowNUll:true
    }
    // middleware

},
{
    timestamp: false,
    // hooks: {
    //     beforeCreate: async (customer,options)=>{
    //         customer.CustomerPassword == null && customer.CUstomerPassword == "" ? bcrypt.hashSync(customer.CustomerPassword, 10): ""
    //     }

    // },
    // {
    // instanceMethod:
    // }

}

);
module.exports = Customer;