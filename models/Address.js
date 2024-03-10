const express = require('express');
const sequelize = require('sequelize');
const database = require('../config/dbconfig');

const Address = database.define("address",{
    AddressId:{
        type:sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    CustomerId:{
        type:sequelize.INTEGER,
        primaryKey: true,
        allowNUll:false
    },
    
    Address:{
        type: sequelize.STRING,
        allowNull:false
    },
    OptionalAddress:{
        type: sequelize.STRING,
        allowNull: true
    },
    State:{
        type:sequelize.STRING,
        allowNUll: true
    },
    City:{
        type: sequelize.STRING,
        allowNull: true
    }
}
)
module.exports= Address;
