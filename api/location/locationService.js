const pool = require('../../config/database');

class LocationService {

  getLocations = callBack => {
    pool.query(
      `select * from LOCATION`,
      [],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
  
        return  callBack(null, results);
      }
    )
  }
}

module.exports = LocationService;