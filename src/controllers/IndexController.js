class IndexController {
  welcomePage(req, res) {
    res.render('welcome');
  }
}

module.exports = new IndexController();
