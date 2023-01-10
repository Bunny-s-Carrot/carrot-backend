const userService = require('../user/userService');
const productService = require('./productService');

const getProducts = async (req, res) => {
  const results = await productService.getProducts();

  if(results.length === 0) {
    return res.status(404).json({
      success: 0,
      message: "Products Not Found"
    })
  }

  return res.status(200).json({
    success: 1,
    payload: results
  })
}

const getProductDetail = async (req, res) => {
  const productId = req.params.product_id;
  const productInfo = await productService.getProductById(productId);
  const userInfo = await userService.getUserById(productInfo?.seller_id);

  const result = {user: userInfo, product: productInfo}

  if (productInfo === undefined) {
    return res.status(404).json({
      success: 0,
      message: "Product Not Found"
    })
  }

  return res.status(200).json({
    success: 1,
    payload: result,
  })
}

const productController = {
  getProducts,
  getProductDetail,
}

module.exports = productController
