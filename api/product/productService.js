const pool = require('../../config/database');

const getProducts = async () => {
  try {
    const products = await pool.execute(
      `select PRODUCT.*, LOCATION.lowest_sect_name from PRODUCT 
      left join LOCATION 
      on PRODUCT.seller_location = LOCATION.location_id
      order by product_id desc`,
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
  try {
    const result = await pool.query(
      `insert into PRODUCT(seller_id, seller_location, title, price, contents, wanted_location, price_suggest, share, classif_id)
      values(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.seller_id,
        data.seller_location,
        data.title,
        data.price,
        data.contents,
        data.wanted_location,
        data.price_suggest,
        data.share,
        data.classif_id
      ]
    )

    return result[0]
  } catch (e) {
    throw Error(e);
  }
}

const deleteProduct = async (product_id) => {
  try {
    const result = pool.query(
      `delete from PRODUCT where product_id = ?`,
      [
        product_id
      ]
    )

    return result[0];
  } catch (e) {
    throw Error(e);
  }
}

const productService = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
}

module.exports = productService;
