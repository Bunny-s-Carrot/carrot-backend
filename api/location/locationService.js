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

const locationService = {
  getLocations,
}

module.exports = locationService