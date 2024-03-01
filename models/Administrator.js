const sequelize = require("sequelize");
const DataBase = require("../config/dbconfig");
const { Sequelize } = require("sequelize");

const Administrator = DataBase.define("administrator", {
  AdminId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  AdminName: {
    type: sequelize.STRING,
    primaryKey: false,
    allowNull: false,
  },
  AdminEmail: {
    type: sequelize.STRING,
    allowNull: false,
    uniqueKey: true,
  },

  AdminPassword: {
    type: sequelize.STRING,
    allowNull: false,
  },
  AdminUsername: {
    type: sequelize.STRING,
    allowNull: false,
    uniqueKey: true,
  },
});
module.exports = Administrator;
