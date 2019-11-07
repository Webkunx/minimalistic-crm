const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
  loginRender(req, res) {
    res.render('login');
  }
  registerRender(req, res) {
    res.render('register');
  }

  login(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/account',
      failureRedirect: '/user/login',
      failureFlash: true
    })(req, res, next);
  }

  logout(req, res) {
    req.logOut();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/user/login');
  }

  async register(req, res) {
    const { name, email, password, password2 } = req.body;
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
        msg: "Password don't match"
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
      });
    } else {
      // Validation passed
      const findUser = await User.findOne({ email: email });
      if (findUser) {
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
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        // save pass and redirect to login
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            const userSave = await newUser.save();
            req.flash('success_msg', 'You are now registered and can log in');
            res.redirect('/user/login');
          });
        });
      }
    }
  }
}

module.exports = new UserController();
