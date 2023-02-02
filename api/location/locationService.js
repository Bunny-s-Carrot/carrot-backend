const pool = require('../../config/database');

const getLocations = async () => {
  try {
    const data = await pool.query(
      `select * from LOCATION`,
    )

    return data[0]
  } catch (e) {
    throw Error(e);
  }
}

const getLocationById = async (location_id) => {
  try {
    const data = await pool.query(
      `select * from LOCATION where location_id = ?`,
      [location_id],
    )
    return data[0][0];
  } catch (e) {
    throw Error(e);
  }
}

const getHCodeById = async(location_id) => {
  try {
    const data = await pool.query(
      `select adm_cd from LOCATION where location_id = ?`,
      [
        location_id
      ]
    )
    
    return data[0][0];
  } catch (e) {
    throw Error(e);
  }
}

const getLocationNameById = async(location_id) => {
  try {
    const data = await pool.query(
      `select addr_name from LOCATION where location_id = ?`,
      [location_id]
    )

    return data[0][0]
  } catch (e) {
    throw Error(e);
  }
}

const getCoordsById = async (location_id) => {
  try {
    const data = await pool.query(
      `select x_coord, y_coord from LOCATION where location_id = ?`,
      [location_id],
    )
    return data[0][0]
  } catch (e) {
    throw Error(e);
  }
}

const locationService = {
  getLocations,
  getLocationById,
  getHCodeById,
  getLocationNameById,
  getCoordsById,
}

module.exports = locationService