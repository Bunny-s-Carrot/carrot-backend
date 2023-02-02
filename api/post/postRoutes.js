const postController = require("./postController");
const router = require("express").Router();

router.get("/", postController.getPosts);
router.get("/:post_id", postController.getPostDetail);
router.get("/category/:classif_id", postController.getPostsByCategory);
router.post("/", postController.createPost);
router.post("/:post_id/comment", postController.createComment);
router.post("/:post_id/comment/:comment_id", postController.createRecomment);
router.post('/image/upload', postController.uploadImages);

module.exports = router;
