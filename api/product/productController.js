const multer = require('multer');
const userService = require('../user/userService');
const productService = require('./productService');
const b2 = require("../../utils/backBlaze/b2");

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

const createProduct = async (req, res) => {
  const body = req.body;
  const result = await productService.createProduct(body);

  return res.status(200).json({
    success: 1,
    product_id: result.insertId,
    message: "Created Product Successfully"
  })
}

const uploadImages = async (req, res, err) => {

  if (err instanceof multer.MulterError) {
    return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
  }
  const files = req.files;
  const productId = req.body.payload.data.product_id;

  try {
    for (let i = 0; i < files.length; i++) {
      const fileName = `product/${productId}/${i}.${files[i].originalname.split('.').at(-1)}`
      await b2.uploadFiles(fileName, files[i].buffer);
    }
  } catch (e) {
    throw Error(e);
  }
  
  
  return res.json({
    message: "File Uploaded Successfully"
  })
}

const productController = {
  getProducts,
  getProductDetail,
  createProduct,
  uploadImages,
}

module.exports = productController
