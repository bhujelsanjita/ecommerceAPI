const express = require('express');
const Database = require('../config/dbconfig');
const sequelize = require('sequelize');

const Biling = Database.define("Biling",{
    BillId:{
        type:sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    BillDate:{
        type:sequelize.DATE,
        allowNull:false,

    },
    Address: {
        type:sequelize.STRING,
        allowNull: false
    },
    DeliveryDate:{
        type:sequelize.DATE,
        allowNull:true
    }
})
module.exports = Biling;