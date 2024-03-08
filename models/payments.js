const express = require('express');
const database = require('../config/dbconfig');
const sequelize = require('sequelize');

const Payments = database.define('payment',{

    userId:{
        type:sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    PaymentMethod:{
        type:sequelize.STRING,
        allowNull:false
    },
    PaymentId:{
        type: sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    BankInfo:{
        type:sequelize.STRING,
        allowNull:false
    },
    AccountNumber:{
        type:sequelize.INTEGER,
        allowNull: false
    },
    AccountHoldersName:{
        type:sequelize.Sequelize.STRING,
        allowNull:false
    }
})
module.exports = Payments;