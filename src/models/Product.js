const Sequelize = require('sequelize');
const db = require('../config/mysql');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    trim: true
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    trim: true
  }
});

module.exports = Product;
