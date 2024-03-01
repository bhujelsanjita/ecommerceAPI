const sequelize = require('sequelize');
const DataBase= require('../config/dbconfig');

const Product = DataBase.define('product',{
    productId: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    productName: {
        type: sequelize.STRING,
        allowNull: false,

    },
    productWaranty: {
        type: sequelize.BOOLEAN,
        allowNull: false,

    },
   stock: {
        type: sequelize.INTEGER,
        allowNull:true,
    },
    productImage: {
        type: sequelize.STRING,
        allowNull:true
    },
    price:
    {
       type: sequelize.INTEGER,
       allowNull: false 

    },
    category: {
        type: sequelize.STRING,
        allowNull:true
    }
    
    
},
{
    //timestamp ->kunai entry vayo vani by default time ra date save garera rakhcha
   timestamp: false,
//    freeze-> product lai producta pardincha

}
)
module.exports = Product;