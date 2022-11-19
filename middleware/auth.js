const { verify } = require("../auth/jwt_util");

const authJWT = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1]; // header에서 access token을 가져옴
    const result = verify(token); // token을 검증합니다.
    if (result.ok) {
      req.id = result.id;
      req.role = result.role;
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: result.message,
      });
    }
  }
};

//개인정보를 수정할때도 모두 JWT를 통해서 이루어져야 하기 때문에, client에서도 access token을 헤더에 담아서 요청해야 함
module.exports = authJWT;
