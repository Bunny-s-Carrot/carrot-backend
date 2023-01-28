const postController = require("./postController");
const router = require("express").Router();

router.get("/", postController.getPosts);
router.get("/:post_id", postController.getPostDetail);
router.get("/category/:classif_id", postController.getPostsByCategory);
router.post("/", postController.createPost);

module.exports = router;
