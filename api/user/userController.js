const locationService = require('../location/locationService');
const userService = require('./userService');

const getUsers = async (_, res) => {
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
  const result = await userService.getUserById(user_id);
  if (result === undefined) {
    return res.status(404).json({
      success: 0,
      message: "User Not Found",
    })
  }

  return res.status(200).json({
    success: 1,
    payload: result,
  })
}

const getLocationById = async (req, res) => {
    const user_id = req.params.user_id;
    const result = await userService.getLocationById(user_id);

    if (result === undefined) {
      return res.status(404).json({
        success: 0,
        message: "Location Not Found"
      })
    }

    const locationInfo1 = await locationService.getLocationById(result.location);
    const locationInfo2 = await locationService.getLocationById(result.location2);

    result['location_info'] = locationInfo1;
    result['location_info2'] = locationInfo2;

    return res.status(200).json({
      success: 1,
      payload: result
    })
}


const updateLocation = async (req, res) => {
  const body = req.body;
  const user_id = req.params.user_id;

  const path = req.originalUrl.split('/').at(-1);

  if (path === 'location1') {
    await userService.updateLocation({ body, user_id });

    return res.status(200).json({
      message: "Updated Location Successfully"
    })

  } else if (path === 'location2') {
    await userService.updateLocation2({ body, user_id });

    return res.status(200).json({
      message: "Updated Location Successfully"
    })

 } else return res.json({
    message: "Abnormal Access"
 })
}

const deleteLocation = async (req, res) => {
  const user_id = req.params.user_id;
  const path = req.originalUrl.split('/').at(-1);

  if (path === 'location1') {
    await userService.deleteLocation(user_id);

    return res.status(200).json({
      message: "Deleted Location Successfully"
    })

  } else if (path === 'location2') {
    await userService.deleteLocation2(user_id);

    return res.status(200).json({
      message: "Deleted Location Successfully"
    })

 } else return res.json({
    message: "Abnormal Access"
 })
}

const updateArea = async (req, res) => {
  const user_id = req.params.user_id;
  const area = req.params.area;
  const path = req.originalUrl.split('/').at(-2);

  if (path === 'area1') {
    await userService.updateArea({ area, user_id });

    return res.status(200).json({
      message: "Updated Area Successfully"
    })

  } else if (path === 'area2') {
    await userService.updateArea2({ area, user_id });

    return res.status(200).json({
      message: "Updated Area Successfully"
    })

 } else return res.json({
    message: "Abnormal Access"
 })
}

const getArea = async (req, res) => {
  const user_id = req.params.user_id;
  const path = req.originalUrl.split('/').at(-1);

  if (path === 'area1') {
    const result = await userService.getArea(user_id);

    return res.status(200).json({
      payload: result
    });
  } else if (path === 'area2') {
    const result = await userService.getArea2(user_id);

    return res.status(200).json({
      payload: result
    });
  } else {
    return res.json({
      message: "Abnormal Access"
    });
  }
}

const getActiveLocation = async (req, res) => {
  const user_id = req.params.user_id;

  const result = await userService.getActiveLocation(user_id);
  if (result === undefined) {
    return res.status(404).json({
      message: "Not Found"
    })
  }

  return res.status(200).json({
    payload: result,
  })
}

const updateActiveLocation = async (req, res) => {
  const active_location = req.params.active_location;
  const user_id = req.params.user_id;

  await userService.updateActiveLocation({ active_location, user_id });

  return res.status(200).json({
    message: "Updated Active Location Successfully"
  })
}

const updateUser = (req, res) => {
  const body = req.body;
  const id = parseInt(req.params.user_id);
  if (body.password) { body.password = hash(body.password); }
  userService.updateUser({ body, id } , (err) => {
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
  getLocationById,
  updateLocation,
  deleteLocation,
  updateArea,
  getArea,
  getActiveLocation,
  updateActiveLocation,
  updateUser,
  withdraw,
}

module.exports = userController;
