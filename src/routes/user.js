const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/User');

// login page
router.get('/login', (req, res) => {
    res.render('login');
});
// register page
router.get('/register', (req, res) => {
    res.render('register');
});

// register handle
router.post('/register', (req, res) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    let errors = [];

    // required fields
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: 'Please, fill all fields'
        });
    }
    // password check
    if (password !== password2) {
        errors.push({
            msg: 'Password don\'t match'
        });
    }
    // render errors if they exist
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // Validation passed
        User.findOne({
                email: email
            })
            .then(user => {
                // checking user existance
                if (user) {
                    errors.push({
                        msg: 'User with this email already exist'
                    });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                // adding user to db and encrypt his password
                else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    bcrypt.genSalt(10, (err, salt) => {

                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/user/login');
                                })
                                .catch(err => console.log(err))
                        });
                    });
                };
            });
    }
});

// logic for user login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});
// logout user
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/user/login');
});

module.exports = router;