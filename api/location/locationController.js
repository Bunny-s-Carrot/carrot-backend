const LocationService = require('./locationService');

class LocationController {
  locationService = new LocationService();

  getLocations = (req, res) => {
    this.locationService.getLocations((err, results) => {
      if (err) {
        throw Error(err);
      }
      return res.status(200).json({
        success: 1,
        payload: results,
      })
    })
  }
}

module.exports = LocationController;