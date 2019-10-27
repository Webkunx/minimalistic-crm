const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoConfig: process.env.MONGO_URI,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlHost: process.env.MYSQL_HOST,
  passportSecret: process.env.SECRET
};
