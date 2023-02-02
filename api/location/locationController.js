const locationService = require('./locationService');

const getLocations = async (_, res) => {
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

const getHcodeById = async(req, res) => {
  const location_id = req.params.location_id;
  const result = await locationService.getHCodeById(location_id);

  if (result === undefined) {
    return res.status(404).json({
      success: 0,
      message: 'Result Not Found'
    })
  }

  return res.status(200).json({
    success: 1,
    payload: result,
  })
}

const getCoordsById = async (req, res) => {
  const locationId = req.params.location_id;

  const result = await locationService.getCoordsById(locationId);

  if (result === undefined) {
    return res.status(404).json({
      success: 0,
      message: 'Result Not Found'
    })
  }

  return res.status(200).json({
    success: 1,
    payload: result,
  })
}

const locationController = {
  getLocations,
  getHcodeById,
  getCoordsById,
}

module.exports = locationController 
