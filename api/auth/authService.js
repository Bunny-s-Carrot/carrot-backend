const e = require('express');
const pool = require('../../config/database');

const signup = (data, callBack) => {
  pool.query(
    `insert into USER(email, password, name, location)
    values(?, ?, ?, ?)`,
    [
      data.email,
      data.password,
      data.name,
      data.locationId,
    ],
    (err, results, fields) => {
      if (err) {
        return callBack(err);
      }
  
      return callBack(null, results[0]);
    }
  )
}

const findUserByEmail = async (email) => {
  try {
    const user = await pool.query(
      `select * from USER where email = ?`,
      [email],
    )

    return user[0][0]
  } catch (e) {
    throw Error(e);
  }
  
}

const getUserById = (userId, callBack) => {
  pool.query(
    `select * from USER where user_id = ?`,
    [userId],
    (err, results, fields) => {
      if (err) {
        return callBack(err);
      }

      return callBack(null, results[0]);
    }
  )
}

const authService = {
  signup,
  findUserByEmail,
  getUserById,
}

module.exports = authService;

