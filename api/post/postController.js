const userService = require("../user/userService");
const postService = require("./postService");

const getPosts = async (req, res) => {
  const results = await postService.getPosts();

  if (results.length === 0) {
    return res.status(404).json({
      success: 0,
      message: "Posts Not Found",
    });
  }
  return res.status(200).json({
    success: 1,
    payload: results,
  });
};

const getPostDetail = async (req, res) => {
  const postId = req.params.post_id;
  const postInfo = await postService.getPostById(postId);
  const userInfo = await userService.getUserById(postInfo?.writer_id);

  const result = { user: userInfo, post: postInfo };

  if (postInfo === undefined) {
    return res.status(404).json({
      success: 0,
      message: "Post Not Found",
    });
  }

  return res.status(200).json({
    success: 1,
    payload: result,
  });
};

const getPostsByCategory = async (req, res) => {
  const categoryId = req.params.classif_id;
  const results = await postService.getPostsByCategory(categoryId);

  if (results.length === 0) {
    return res.status(200).json({
      success: 0,
      message: "Posts Not Found_c",
    });
  }
  return res.status(200).json({
    success: 1,
    payload: results,
  });
};

const createPost = async (req, res) => {
  const body = req.body;
  await postService.createPost(body);

  return res.json({
    message: "Writed Post Successfully",
  });
};

const postController = {
  getPosts,
  getPostDetail,
  getPostsByCategory,
  createPost,
};

module.exports = postController;
