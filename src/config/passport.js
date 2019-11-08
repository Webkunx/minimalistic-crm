const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const brcypt = require('bcrypt');
const passportJWT = require('passport-jwt');

const User = require('../models/User');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function(passport) {
  passport.use(
    new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "User with this email doesn't exist" });
          }
          brcypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JSON_SECRET
      },
      function(jwtPayload, done) {
        console.log(jwtPayload);
        //find the user in db if needed
        return UserModel.findOneById(jwtPayload.id)
          .then(user => {
            return done(null, user);
          })
          .catch(err => {
            return done(err);
          });
      }
    )
  );
};
