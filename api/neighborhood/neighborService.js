const pool = require('../../config/database');
    
const getPosts = async () => {
  try {
	  const posts = await pool.query(
		`select NEIGHBORHOOD.*, lowest_sect_name from NEIGHBORHOOD inner join USER on writer_id = user_id inner join LOCATION on location = location_id;`,
	  )

    return posts[0];
  } catch(e) {
    throw Error(e);
  }
}

// const getUserbyWriterId = callBack => {
// 	pool.query(
// 		``
// 	)
// }

const neighborService = {
  getPosts,
}

module.exports = neighborService