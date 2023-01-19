const router = require('express').Router();
const createpostController = require('./createPostController');

router.get('/', createpostController.createPost);

module.exports = router;