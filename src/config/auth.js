const passport = require('passport');
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    passport.authenticate('jwt', { session: false });
    req.flash('error_msg', 'Please log in to view this page');
    res.redirect('/user/login');
  }
};
