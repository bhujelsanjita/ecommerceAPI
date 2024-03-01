const sequalize = require('sequelize');
const DataBase= require('../config/dbconfig');

const Category = DataBase.define('category',{
    CategoryId:{
        type:sequalize.INTEGER,
        primaryKey:true,
        allowNull: false
    },
    CategoryName:{
        type: sequalize.STRING,
        primarykey:false,
        allowNull: false
    },
    
},{
timestamp:true
});
module.exports = Category;
