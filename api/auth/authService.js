const pool = require('../../config/database');

const signup = async (data, callBack) => {
  try {
    const result = await pool.query(
      `insert into USER(email, password, name, location)
      values(?, ?, ?, ?)`,
      [
        data.email,
        data.password,
        data.name,
        data.locationId,
      ],
    )

    return result[0];
  } catch (e) {
    throw Error(e);
  }


}

const findUserByEmail = async (email) => {
  try {
    const user = await pool.query(
      `select USER.user_id, USER.password, USER.name, USER.email, USER.location, USER.manner_temp, LOCATION.x_coord, LOCATION.y_coord from USER left join LOCATION on USER.location = LOCATION.location_id where email = ?`,
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

