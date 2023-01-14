const pool = require('../../config/database');
    
const getPosts = async () => {
  try {
	  const posts = await pool.query(
		`select NEIGHBORHOOD.*, lowest_sect_name, category_name from NEIGHBORHOOD 
    inner join USER on writer_id = user_id 
    inner join LOCATION on location = location_id
    inner join POSTCATEGORY on category_id = classif_id;`,
	  )

    return posts[0];
  } catch(e) {
    throw Error(e);
  }
}

const getPostById = async (postId) => {
  try {
    const postDetail = await pool.query(
      `select * from NEIGHBORHOOD
      inner join POSTCATEGORY on category_id = classif_id
      where post_id = ?`,
      [postId]
    )
    return postDetail[0][0];
  } catch (e) {
    throw Error(e);
  }
}

const neighborService = {
  getPosts,
  getPostById,
}

module.exports = neighborService