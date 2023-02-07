const multer = require('multer');
const userService = require("../user/userService");
const postService = require("./postService");
const b2 = require("../../utils/backBlaze/b2");
const { convertToJPG } = require('../../utils/file/extension')

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
  const userId = userInfo.user_id;
  const commentInfo = await postService.getComments(postId);
  const getheart = await postService.getHeart(postId, userId);
  let heartInfo = getheart.length !== 0;
  const getempaOne = await postService.getEmpaOne(postId, userId);
  let empaoneInfo = getempaOne.length !== 0;
  const empaallInfo = await postService.getEmpaAll(postId);

  let result;
  
  if (commentInfo.length === 0) {
    result = { user: userInfo, post: postInfo, heart: heartInfo, empaOne: empaoneInfo, empaAll: empaallInfo }
  } else {
    result = { user: userInfo, post: postInfo, heart: heartInfo, empaOne: empaoneInfo, empaAll: empaallInfo, comment: commentInfo }
  };

  if (postInfo === undefined) {
    return res.status(404).json({
      success: 0,
      message: "Post Not Found",
    });
  }

  return res.status(200).json({
    success: 1,
    payload: result
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
  const result = await postService.createPost(body);

  return res.json({
    post_id: result.insertId,
    message: "Writed Post Successfully",
  });
};

const createComment = async (req, res) => {
  const body = req.body;
  await postService.createComment(body);

  return res.json({
    message: "Create Comment Successfully"
  });
}

const createRecomment = async (req, res) => {
  const body = req.body;
  await postService.createRecomment(body);

  return res.json({
    message: "Create Recomment Successfully"
  });
}

const uploadImages = async (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
  }
  const files = req.files;
  const postId = req.body.payload.data.post_id;

  try {
    for (let i = 0; i < files.length; i++) {
      const buffer = await convertToJPG(files[i].buffer);

      const fileName = `post/${postId}/${i}.jpg`
      await b2.uploadFiles(fileName, buffer)
    }
    
    return res.json({
      message: "File Uploaded Successfully"
    });
  } catch (e) {
    throw Error(e);
  }
}

const deleteImages = async (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
  }
}

const getImageList = async (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
  }

  const postId = req.params.post_id;
  const result = await b2.getFileList('post', postId);

  return res.status(200).json({
    payload: result
  });
}

const updateHeart = async (req, res) => {
  const body = req.body;
  await postService.updateHeart(body);

  return res.status(200).json({
    success: 1,
    message: "Heart update"
  })
}

const updateEmpa = async (req, res) => {
  const body = req.body;
  await postService.updateEmpa(body);

  return res.status(200).json({
    success: 1,
    message: "Empa update"
  })
}

const postController = {
  getPosts,
  getPostDetail,
  getPostsByCategory,
  createPost,
  createComment,
  createRecomment,
  uploadImages,
  deleteImages,
  getImageList,
  updateHeart,
  updateEmpa
};

module.exports = postController;
