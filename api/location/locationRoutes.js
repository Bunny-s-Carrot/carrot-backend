const locationController = require('./locationController');
const router = require('express').Router();


router.get('/', locationController.getLocations);

module.exports = router;