const NeighborController = require('./neighrborController');
const router = require('express').Router();

const neighborController = new NeighborController();

router.get('/',neighborController.getPosts);

module.exports = router;