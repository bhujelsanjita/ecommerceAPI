const express = require('express');
const Database = require('../config/dbconfig');
const sequelize = require('sequelize');

const Cancellation = Database.define('cancellation',{
    CancellationId:{
        type:sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    CancellationDate:{
        type:sequelize.INTEGER,
        allowNull: true

    },
    RefundAmount:{
        type:sequelize.INTEGER,
        allowNull:false
    }

})
module.exports= Cancellation;

