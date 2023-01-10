const userService = require('./userService');

const getUsers = async (req, res) => {
  const results = await userService.getUsers();

  if (results.length === 0) {
    return res.status(404).json({
      success: 0,
      message: 'Users Not Found'
    })
  }

  return res.json({
    success: 1,
    payload: results,
  })
}

const getUserById = async (req, res) => {
  const user_id = req.params.user_id;
  const result = await userService.getUserById(user_id)
  if (result === undefined) {
    return res.status(404).json({
      success: 0,
      message: "User not Found",
    })
  }

  return res.status(200).json({
    success: 1,
    payload: result,
  })
}


const updateUser = (req, res) => {
  const body = req.body;
  const id = parseInt(req.params.user_id);
  if (body.password) { body.password = hash(body.password); }
  this.userService.updateUser({ body, id } , (err) => {
    if (err) {
      throw Error(err);
    }
    return res.json({
      success: 1,
      message: "Updated Successfully",
    })
  })
}

const withdraw = (req, res) => {
  const id = req.params.user_id;
  userService.withdraw(id, (err) => {
    if (err) {
      throw Error(err);
    }
      
    return res.json({
      success: 1,
      message: "Deleted Successfully"
    });
  });
}

const userController = {
  getUsers,
  getUserById,
  updateUser,
  withdraw,
}

module.exports = userController;
