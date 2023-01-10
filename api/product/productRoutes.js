const productController = require('./productController');
const router = require('express').Router();


router.get('/', productController.getProducts);
router.get('/:product_id', productController.getProductDetail);

module.exports = router;