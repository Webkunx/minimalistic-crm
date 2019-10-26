const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthController = require('../controllers/AuthController');

// login page
router.get('/login', AuthController.loginRender);
// register page
router.get('/register', AuthController.registerRender);

// register handle
router.post('/register', AuthController.register);

// logic for user login
router.post('/login', AuthController.login);

// logout user
router.get('/logout', AuthController.logout);

module.exports = router;
