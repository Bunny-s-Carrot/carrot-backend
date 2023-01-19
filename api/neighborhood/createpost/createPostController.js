const createpostService = require('./createpostService');


const createPost = async (req, res) => {
    const body = req.query

    await createpostService.createPost(body);

    return res.redirect("http://localhost:3000/neighborhood");
};

const createpostController = {
    createPost
}

module.exports = createpostController;