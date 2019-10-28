const Sequelize = require('sequelize');

const { mysqlHost, mysqlPassword, mysqlUser } = require('./keys');

module.exports = new Sequelize('work1', mysqlUser, mysqlPassword, {
  dialect: 'mysql',
  host: mysqlHost
});
