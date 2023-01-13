const pool = require('../../config/database');

const getLocations = async () => {
  try {
    const locations = await pool.query(
      `select * from LOCATION`,
    )

    return locations[0];
  } catch (e) {
    throw Error(e);
  }
}

const locationService = {
  getLovations,
}

module.exports = locationService