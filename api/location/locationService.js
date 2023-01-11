const pool = require('../../config/database');

const getLocations = async () => {
  try {
    const locations = await pool.query(
      `select * from LOCATION`,
    )

    return locations
  } catch (e) {
    throw Error(e);
  }
}

const getLocationById = async (location_id) => {
  try {
    const location = await pool.query(
      `select * from LOCATION where location_id = ?`,
      [location_id],
    )
    console.log(location[0][0]);
    return location[0][0];
  } catch (e) {
    throw Error(e);
  }
}

const locationService = {
  getLocations,
  getLocationById,
}

module.exports = locationService