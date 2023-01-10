const productController = require('./productController');
const router = require('express').Router();


router.get('/product', productController.getProducts);
router.get('/product/:product_id', productController.getProductDetail);

module.exports = router;