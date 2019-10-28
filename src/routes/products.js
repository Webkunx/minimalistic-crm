const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');
const Product = require('../models/Product');

const ProductController = require('../controllers/ProductController');

// router.use(ensureAuthenticated);

// get all  products
router.get('/', ProductController.getAll);

// get by id
router.get('/:id', ProductController.getById);

// create product
router.post('/', ProductController.post);

// update product
router.put('/:id', ProductController.put);

// destroy product
router.delete('/:id', ProductController.delete);

module.exports = router;
