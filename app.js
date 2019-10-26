const express = require('express');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const Sequelize = require('sequelize');
// db config
const db = require('./src/config/keys').mongoURI;

// connection to db
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const sequelize = new Sequelize('work1', 'root', 'Astra2000', {
  dialect: 'mysql',
  host: 'localhost'
});

// auth to mysql
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// variables setup
const app = express();
const urlencoded = express.urlencoded({
  extended: false
});
const PORT = process.env.PORT || 3000;

// Import passport strategy
require('./src/config/passport')(passport);

// ejs setup
app.set('views', __dirname + '/public/views');
app.use(expressLayouts);
app.set('view engine', 'ejs');

// mids
app.use(logger('dev'));
app.use(urlencoded);
app.use(
  session({
    secret: 'vanyaleyn2019',
    resave: false,
    saveUninitialized: true
  })
);

// mid for messages
app.use(flash());

// mids for passport
app.use(passport.initialize());
app.use(passport.session());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./src/routes/index'));
app.use('/user', require('./src/routes/auth'));
app.use('/products', require('./src/routes/products'));
app.use('/account', require('./src/routes/account'));

// server start
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port...`);
});
