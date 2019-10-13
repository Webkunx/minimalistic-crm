const express = require('express');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

// db config 
const db = require('./config/keys').mongoURI;

// connection to db 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

// variables setup 
const app = express();
const urlencoded = express.urlencoded({ extended: false });
const PORT = process.env.PORT || 3000;

// Import passport strategy
require('./config/passport')(passport);

// ejs setup 
app.use(expressLayouts);
app.set('view engine', 'ejs')

// mids 
app.use(logger('dev'));
app.use(urlencoded);
app.use(session({
    secret: 'vanyaleyn2019',
    resave: false,
    saveUninitialized: true,
}));

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
})

// Routes
app.use('/', require('./rountes/index'));
app.use('/user', require('./rountes/user'));

// server start 
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port...`);
});



