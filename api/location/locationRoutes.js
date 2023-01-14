const locationController = require('./locationController');
const router = require('express').Router();


router.get('/list', locationController.getLocations);
router.get('/coords', locationController.getCoordsById);

module.exports = router;