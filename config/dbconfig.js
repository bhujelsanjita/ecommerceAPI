const Sequelize = require('sequelize');
const dotenv = require('dotenv');


dotenv.config();
// dbconfig->database configuration
const dbname = process.env.DATABASE_NAME;
const dbpass = process.env.DBPASSWORD;
const dbuser = process.env.DBUSER;
const dbhost = process.env.DBHOST
const sequalize = new Sequelize(dbname,dbuser,dbpass,{dialect:'mysql',host: dbhost})
// dialect--Database service provider
module.exports = sequalize;
