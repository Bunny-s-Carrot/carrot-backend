const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const redisClient = require("./redis");
const secret = process.env.SECRET;

module.exports = {
  sign: (user) => {
    // access token 발급
    const payload = {
      // access token에 들어갈 payload
      id: user.id,
      role: user.role,
    };

    return jwt.sign(payload, secret, {
      // secret으로 sign하여 발급하고 return
      algorithm: "HS256", // 암호화 알고리즘
    });
  },
  verify: (token) => {
    // access token 검증
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret);
      return {
        ok: true,
        id: decoded.id,
        role: decoded.role,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
};
