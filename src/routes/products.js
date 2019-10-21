const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');

// router.use(ensureAuthenticated);

router.get('/', (req, res) => {
  res.send('Helo');
});

router.get('/test', (req, res) => {
  res.send('test');
});

module.exports = router;
