const pool = require('../../config/database');

const getProducts = async (admCodes) => {
  try {
    const products = await pool.query(
      `select PRODUCT.*, LOCATION.addr_name from PRODUCT 
      left join LOCATION 
      on PRODUCT.seller_location = LOCATION.location_id
      where PRODUCT.seller_adm_cd in (${admCodes})
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
      `insert into PRODUCT(seller_id, seller_location, seller_adm_cd, title, price, contents, wanted_location, price_suggest, share, classif_id)
      values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.seller_id,
        data.seller_location,
        data.seller_adm_cd,
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

const updateHeart = async (product_id, plus) => {
  try {
    if (plus) {
      const result = pool.query(
        `update PRODUCT set heart = heart + 1 where product_id = ${product_id}`
      );

      return result[0];
    } else {
      const result = pool.query(
        `update PRODUCT set heart = heart - 1 where product_id = ${product_id}`
      );

      return result[0];
    }
  } catch (e) {
    throw Error(e);
  }
}

const productService = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateHeart,
}

module.exports = productService;
