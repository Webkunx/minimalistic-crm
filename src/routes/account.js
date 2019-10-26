const { Router } = require('express');
const { ensureAuthenticated } = require('../config/auth');
const AccountController = require('../controllers/AccountController');

const router = Router();

router.use(ensureAuthenticated);

router.get('/', AccountController.dashboardRender);

module.exports = router;
