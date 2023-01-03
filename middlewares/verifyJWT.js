const { verify } = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  let token = req.get('authorization');
  if (token) {
    token = token.slice(7);
    verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({
          success: 0,
          message: 'Invalid Token'
        })
      } else { next() }
    })
  } else {
    res.json({
      success: 0,
      message: "Unauthorized"
    })
  }
}

module.exports = { verifyJWT }