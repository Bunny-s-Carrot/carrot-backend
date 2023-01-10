const locationService = require('./locationService');

const getLocations = async (req, res) => {
  const results = await locationService.getLocations();

  if (results.length === 0) {
    return res.ststus(404).json({
      success: 0,
      message: 'Locations Not Found'
    })
  }
    
  return res.status(200).json({
    success: 1,
    payload: results,
  })
}

const locationController = {
  getLocations,
}

module.exports = locationController 
