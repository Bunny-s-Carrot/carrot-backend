const LocationController = require('./locationController');
const router = require('express').Router();

const locationController = new LocationController();

router.get('/', locationController.getLocations);

module.exports = router;