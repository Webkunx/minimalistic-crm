const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');
const Product = require('../models/Product');

const ProductController = require('../controllers/ProductController');

// router.use(ensureAuthenticated);

// get all  products
router.get('/', ProductController.readAll);

// get by id
router.get('/:id', ProductController.readById);

// create product
router.post('/', ProductController.createProduct);

// update product
router.put('/:id', ProductController.updateProduct);

// destroy product
router.delete('/:id', ProductController.destroyProduct);

// router.get('/sayhi', ProductController.sayHi());

module.exports = router;
