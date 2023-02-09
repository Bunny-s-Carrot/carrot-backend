const pool = require("../../config/database");

const getPosts = async (admCodes) => {
  try {
    const posts = await pool.query(
      `select NEIGHBORHOOD.*, addr_name, adm_cd, category_name from NEIGHBORHOOD 
    inner join USER on writer_id = user_id 
    inner join LOCATION on writer_location = location_id
    inner join POSTCATEGORY on category_id = classif_id
    where adm_cd in (${admCodes})
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
      `select NEIGHBORHOOD.*, category_name, addr_name from NEIGHBORHOOD
      inner join POSTCATEGORY on category_id = classif_id
      inner join LOCATION on writer_location = location_id
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
      insert into NEIGHBORHOOD(writer_id, writer_location, classif_id, title, content, image)
      values(?, ?, ?, ?, ?, ?)`,
      [data.writer_id, data.writer_location, data.classif_id, title, data.content, data.img]
    )
    return result[0];
  } catch (e) {
    throw Error(e);
  }
};

const getComments = async (postId) => {
  try {
    const comments = await pool.query(
      `select comment_id, name, writer_id, addr_name, COMMENT.created_at, comment, likes, depth, mother_id from COMMENT 
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

    const upd = await pool.query(
      `update NEIGHBORHOOD set chat = chat + 1 where post_id = ${data.post_id}`
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

    const upd = await pool.query(
      `update NEIGHBORHOOD set chat = chat + 1 where post_id = ${data.post_id}`
    )
    
    return result[0]
  } catch (e) {
    throw Error(e);
  }
}

const getHeart = async(postId, userId) => {
  try {
    const result = await pool.query(
      `select number from HEART where post_id=? and user_id=?`,
      [postId, userId]
    )

    return result[0];
    
  } catch (e) {
    throw Error(e);
  }
}

const updateHeart = async (data) => {
  try {
    let result;
    if (data.plus) {
      result = await pool.query(
        `insert into HEART(user_id, type, post_id) 
        values(?,'post',?)`,
        [
          data.user_id,
          data.post_id
        ]
      )
    } else {
      result = await pool.query(
        `delete from HEART where user_id = ? and post_id = ?`,
        [
          data.user_id,
          data.post_id
        ]
      )
    }

    return result[0]
  } catch (e) {
    throw Error(e);
  }
}

const getEmpaOne = async(postId, userId) => {
  try {
    const result = await pool.query(
      `select number from THUMB where post_id=? and user_id=?`,
      [postId, userId]
    )
    return result[0];
  } catch (e) {
    throw Error(e);
  }
}

const getEmpaAll = async(postId) => {
  try {
    const result = await pool.query(
      `select count(number) from THUMB where post_id=?`,
      [postId]
    )
    return result[0][0]["count(number)"];
  } catch (e) {
    throw Error(e);
  }
}

const updateEmpa = async (data) => {
  try {
    let result;
    if (data.plus) {
      result = await pool.query(
        `insert into THUMB(user_id, post_id) 
        values(?,?)`,
        [
          data.user_id,
          data.post_id
        ]
      )

      const upd = await pool.query(
        `update NEIGHBORHOOD set empa = empa + 1 where post_id = ${data.post_id}`
      )
    } else {
      result = await pool.query(
        `delete from THUMB where user_id = ? and post_id = ?`,
        [
          data.user_id,
          data.post_id
        ]
      )

      const upd = await pool.query(
        `update NEIGHBORHOOD set empa = empa - 1 where post_id = ${data.post_id}`
      )
    }

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
  createRecomment,
  getHeart,
  updateHeart,
  getEmpaOne,
  getEmpaAll,
  updateEmpa
};

module.exports = postService;
