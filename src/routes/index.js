const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');

router.get('/', IndexController.welcomePage);

module.exports = router;
