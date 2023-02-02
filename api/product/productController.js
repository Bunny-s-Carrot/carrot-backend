const multer = require('multer');
const userService = require('../user/userService');
const productService = require('./productService');
const b2 = require("../../utils/backBlaze/b2");
const { convertToJPG } = require('../../utils/file/extension')


const getProducts = async (req, res) => {
  const admCodes = req.query.admCodes;
  const results = await productService.getProducts(admCodes);

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

const deleteProduct = async (req, res) => {
  const product_id = req.params.product_id;
  await productService.deleteProduct(product_id);

  return res.status(200).json({
    message: "Deleted Product"
  });
}

const uploadImages = async (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
  }
  const files = req.files;
  const productId = req.body.payload.data.product_id;

  try {
    for (let i = 0; i < files.length; i++) {
      const buffer = await convertToJPG(files[i].buffer);

      const fileName = `product/${productId}/${i}.jpg`
      await b2.uploadFiles(fileName, buffer)
    }
    
    return res.json({
      message: "File Uploaded Successfully"
    });
  } catch (e) {
    throw Error(e);
  }
}

const deleteImages = async (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
  }

  const productId = req.params.product_id;
  await b2.deleteFiles('product', productId);

  return res.status(200).json({
    message: "Deleted Images Successfully"
  })
}

const getImageList = async (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
  }

  const productId = req.params.product_id;

  const result = await b2.getFileList('product', productId);

  return res.status(200).json({
    payload: result
  });
}

const getThumbnail = async (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
  }
  const productId = req.params.product_id;

  const result = await b2.getThumbnail('product', productId);

  return res.status(200).json({
    payload: result
  })
  
}


const productController = {
  getProducts,
  getProductDetail,
  createProduct,
  deleteProduct,
  uploadImages,
  deleteImages,
  getImageList,
  getThumbnail,
}

module.exports = productController
