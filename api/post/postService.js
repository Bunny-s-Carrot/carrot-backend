const { query } = require('../../config/database');
const pool = require("../../config/database");

const getPosts = async () => {
  try {
    const posts = await pool.query(
      `select NEIGHBORHOOD.*, addr_name, category_name from NEIGHBORHOOD 
    inner join USER on writer_id = user_id 
    inner join LOCATION on location = location_id
    inner join POSTCATEGORY on category_id = classif_id
    order by post_id desc;`
    );

    return posts[0];
  } catch (e) {
    throw Error(e);
  }
};

const getPostById = async (postId) => {
  try {
    const postDetail = await pool.query(
      `select * from NEIGHBORHOOD
      inner join POSTCATEGORY on category_id = classif_id
      where post_id = ?`,
      [postId]
    );
    return postDetail[0][0];
  } catch (e) {
    throw Error(e);
  }
};

const getPostsByCategory = async (categoryId) => {
  try {
    const posts_c = await pool.query(
      `select NEIGHBORHOOD.*, addr_name, category_name from NEIGHBORHOOD 
      inner join USER on writer_id = user_id 
      inner join LOCATION on location = location_id
      inner join POSTCATEGORY on category_id = classif_id
      where classif_id = ?
      order by post_id desc;;`,
      [categoryId]
    );

    return posts_c[0];
  } catch (e) {
    throw Error(e);
  }
};

const createPost = async (data) => {
  try {
    const index = data.content.indexOf("\n");
    let title;
    if (index == -1) {
      title = data.content;
    } else {
      title = data.content.slice(0, index);
    }

    const result = await pool.query(
      `
      insert into NEIGHBORHOOD(writer_id, classif_id, title, content)
      values(12, ?, ?, ?)`,
      [data.classif_id,title, data.content]
    )
    return result[0];
  } catch (e) {
    throw Error(e);
  }
};

const getComments = async (postId) => {
  try {
    const comments = await pool.query(
      `select comment_id, name, addr_name, COMMENT.created_at, comment, likes, depth, mother_id from COMMENT 
      inner JOIN USER on user_id = writer_id
      inner join LOCATION on location = location_id
      where post_id = ?
      order by mother_id`,
      [postId]
    )
    return comments[0]
  } catch (e) {
    throw Error(e);
  }
}

const createComment = async (data) => {
  try {
    const result = await pool.query(
      `insert into COMMENT(post_id, writer_id, comment, depth)
      values(?,?,?,0)`,
      [
        data.post_id,
        data.writer_id,
        data.content
      ],
    )

    const result1 = await pool.query(
      `select comment_id from COMMENT where comment = ?`,
      [
        data.content
      ]
    )

    const commentId = result1[0][0].comment_id;

    const result2 = await pool.query(
      `update COMMENT set mother_id = ? where comment_id = ?`,
      [
        commentId,
        commentId
      ]
    )

    return result2[0]
  } catch (e) {
    throw Error(e);
  }
}

const createRecomment = async (data) => {
  try {
    const result = await pool.query(
      `insert into COMMENT(post_id, writer_id, comment, depth, mother_id)
      values(?,?,?,1,?)`,
      [
        data.post_id,
        data.writer_id,
        data.content,
        data.mother_id
      ],
    )
    
    return result[0]
  } catch (e) {
    throw Error(e);
  }
}

const postService = {
  getPosts,
  getPostById,
  getPostsByCategory,
  createPost,
  getComments,
  createComment,
  createRecomment
};

module.exports = postService;
