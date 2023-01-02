const auth = require("./middleware/auth");
const jwt = require("./utils/jwt_util");
const redisClient = require("./utils/redis");

const login = async (req, res) => {
  //db에서 아이디와 비번확인->만들어야 함
  if (success) {
    const accessToken = jwt.sign(user);
    res.status(200).send({
      ok: true,
      data: {
        accessToken,
      },
    });
  } else {
    res.status(401).send({
      ok: false,
      message: "password is incorrect",
    });
  }
};
