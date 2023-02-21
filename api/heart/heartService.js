const pool = require('../../config/mysql');

const updateHeart = async (data) => {
  try {
    let result;
    if (data.plus) {
      result = await pool.query(
        `insert into HEART(user_id, type, product_id, post_id) 
        values(?,?,?, ?)`,
        [
          data.user_id,
          data.type,
          data.product_id,
          data.post_id
        ]
      )
    } else {
      if (data.type === 'product') {
        result = await pool.query(
          `delete from HEART where user_id = ? and product_id = ?`,
          [
            data.user_id,
            data.product_id
          ]
        )
      } else {
        result = await pool.query(
          `delete from HEART where user_id = ? and post_id = ?`,
          [
            data.user_id,
            data.post_id
          ]
        )
      }
      
    }

    return result[0]
  } catch (e) {
    throw Error(e);
  }
}

const getHeart = async(data) => {
  try {
    if (data.type === 'product') {
      const result = await pool.query(
        `select number from HEART where product_id=? and user_id=?`,
        [
          data.product_id,
          data.user_id
        ]
      )

      return result[0]
    } else if (data.type === 'post') {
      const result = await pool.query(
        `select number from HEART where post_id=? and user_id=?`,
        [
          data.postId, 
          data.userId
        ]
      )

      return result[0];
    } else return []
  } catch (e) {
    throw Error(e);
  }
}

const heartService = {
  updateHeart,
  getHeart,
}

module.exports = heartService