const productController = require('./productController');
const router = require('express').Router();


router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.delete('/:product_id/delete', productController.deleteProduct);
router.post('/image/upload', productController.uploadImages);
router.get('/image/:product_id', productController.getImageList);
router.get('/image/:product_id/delete', productController.deleteImages);
router.get('image/:product_id/thumbnail', productController.getThumbnail);
router.get('/:product_id', productController.getProductDetail);

module.exports = router;