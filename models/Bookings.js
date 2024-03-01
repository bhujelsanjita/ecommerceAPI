const express = require('express');
const Database = require('../config/dbconfig');
const sequelize = require('sequelize');

const Bookings = Database.define("Bookings",{
    productName:{
        type:sequelize.STRING,
        allowNull:false
    },
    CustomerName:{
        type:sequelize.STRING,
        allowNull: false
    },
    BillingId:{
        type:sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    quantity:{
        type: sequelize.STRING,
        allowNull:false
    },
    price:{
        type: sequelize.INTEGER,
        allowNull: false
    },
    status:{
        type: sequelize.STRING,
        allowNull:false
    }
})
module.exports = Bookings;