const pool = require('../../config/database');

const getProducts = async () => {
  try {
    const products = await pool.execute(
      `select PRODUCT.*, LOCATION.lowest_sect_name from PRODUCT 
      left join LOCATION 
      on PRODUCT.seller_location = LOCATION.location_id`,
    )
    return products[0];
  } catch (e) {
    throw Error(e);
  }
}

const getProductById = async (productId) => {
  try {
    const productDetail = await pool.query(
      `select * from PRODUCT where product_id = ?`,
      [productId]
    )
    return productDetail[0][0];
  } catch (e) {
    throw Error(e);
  }
}

const createProduct = async (data) => {

}

const productService = {
  getProducts,
  getProductById,
  createProduct,
}

module.exports = productService;
