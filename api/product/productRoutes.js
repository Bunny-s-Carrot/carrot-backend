const productController = require('./productController');
const router = require('express').Router();


router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.post('/image/upload', productController.uploadImages);
router.get('/image/:product_id', productController.getImageList);
router.get('/:product_id', productController.getProductDetail);

module.exports = router;