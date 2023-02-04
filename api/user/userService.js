const e = require('express');
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

const getUserById = async (user_id) => {
  try {
    const userDetail = await pool.query(
      `select user_id, email, name, location, manner_temp, addr_name, adm_cd from USER 
      inner join LOCATION on location = location_id
      where user_id = ?`,
      [user_id],   
    )
    return userDetail[0][0];
    
  } catch (e) {
    throw Error(e);
  }
  
}

const getLocationById = async (user_id) => {
  try {
    const result = await pool.query(
      `select location, location2, active_location from USER where user_id = ?`,
      [user_id]
    )

    return result[0][0];
  } catch (e) {
    throw Error(e);
  }
}

const updateLocation = async (data) => {
  try {
    const result = await pool.query(
      `update USER set location=? where user_id = ?`,
      [
        data.body.location,
        data.user_id
      ]
    );

    return result[0];
  } catch (e) {
    throw Error(e);
  }
}

const deleteLocation = async (user_id) => {
  try {
    const result = await pool.query(
      `update USER set location=NULL where user_id = ?`,
      [
        user_id
      ]
    )

    return result[0];
  } catch (e) {
    throw Error(e);
  }
}

const updateLocation2 = async (data) => {
  try {
    const result = await pool.query(
      `update USER set location2=? where user_id = ?`,
      [
        data.body.location,
        data.user_id
      ]
    );

    return result[0];
  } catch (e) {
    throw Error(e);
  }
}

const deleteLocation2 = async (user_id) => {
  try {
    const result = await pool.query(
      `update USER set location2=NULL where user_id = ?`,
      [
        user_id
      ]
    )

    return result[0];
  } catch (e) {
    throw Error(e);
  }
}

const getActiveLocation = async (user_id) => {
  try {
    const data = await pool.query(
      `select active_location from USER where user_id = ?`,
      [
        user_id
      ]
    )

    return data[0][0];
  } catch (e) {
    throw Error(e);
  }
}

const updateActiveLocation = async (data) => {
  try {
    await pool.query(
      `update USER set active_location=? where user_id = ?`,
      [
        data.active_location,
        data.user_id,
      ]
    )
  } catch (e) {
    throw Error(e)
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
  
const withdraw = async (id, callBack) => {
  await pool.query(
    `delete from USER where user_id = ?`,
    [id],
  );

  return;
}

const userService = {
  getUsers,
  getUserById,
  getLocationById,
  updateUser,
  withdraw,
  updateLocation,
  deleteLocation,
  updateLocation2,
  deleteLocation2,
  getActiveLocation,
  updateActiveLocation,
}


module.exports = userService;
