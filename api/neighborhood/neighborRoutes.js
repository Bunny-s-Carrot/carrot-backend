const NeighborController = require('./neighborController');
const router = require('express').Router();

const neighborController = new NeighborController();

router.get('/',neighborController.getPosts);

module.exports = router;