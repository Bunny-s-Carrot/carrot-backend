const pool = require('../../../config/database');

const createPost = async (data, callBack) => {
    try {

    const contentcut = data.content.split('\n')
    let title;
    let content = "";
    for (let i in contentcut) {
        if (i==0) {
            title = contentcut[i]
        } else {
            content += contentcut[i];
        }
    }

    const result = await pool.query(`
    insert into NEIGHBORHOOD(writer_id, classif_id, title, content)
    values(13, 2003, ?, ?)`,
    [
      title,
      content
    ],
    )

    return result[0];
} catch (e) {
    throw Error(e);
}
}

const createpostService = {
    createPost
}

module.exports = createpostService