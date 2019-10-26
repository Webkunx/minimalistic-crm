class AccountController {
  dashboardRender(req, res) {
    res.render('dashboard', {
      name: req.user.name
    });
  }
}

module.exports = new AccountController();
