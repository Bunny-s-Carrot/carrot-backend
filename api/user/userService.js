const pool = require('../../config/database');

const getUsers = async () => {
  try {
    const users = await pool.query(
      `select user_id, email, name, location, manner_temp from USER`,
    )
  
    return users[0];
  } catch (e) {
    throw Error(e);
  }
  
}

const getUserById = async (id) => {
  try {
    const userDetail = await pool.query(
      `select user_id, email, name, location, manner_temp from USER where user_id = ?`,
      [id],   
    )
    return userDetail[0][0];
    
  } catch (e) {
    throw Error(e);
  }
  
}
  
const updateUser = (data, callBack) => {
  pool.query(
    `update USER set password=?, name=?, location=?, manner_temp=? where user_id = ?`,
    [
      data.body.password,
      data.body.name,
      data.body.location,
      data.body.manner_temp,
      data.id,
    ],
    (err, results, fields) => {
      if (err) {
        return callBack(err);
      }

      return callBack(null, results[0]);
    }
  )
}
  
const withdraw = (id, callBack) => {
  pool.query(
    `delete from USER where user_id = ?`,
    [id],
    (err, results, fields) => {
      if (err) {
        return callBack(err);
      }

      return callBack(null, results[0]);
    }
  )
}

const userService = {
  getUsers,
  getUserById,
  updateUser,
  withdraw,
}


module.exports = userService;
