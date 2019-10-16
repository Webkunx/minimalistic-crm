module.exports = (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/user/login');
}