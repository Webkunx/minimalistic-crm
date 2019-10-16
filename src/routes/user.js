const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../controllers/UserController');

// login page
router.get('/login', (req, res) => {
  res.render('login');
});
// register page
router.get('/register', (req, res) => {
  res.render('register');
});

// register handle
router.post('/register', UserController.register);

// logic for user login
router.post('/login', UserController.login);

// logout user
router.get('/logout', UserController.logout);

module.exports = router;
