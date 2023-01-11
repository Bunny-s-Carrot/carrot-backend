const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(req);
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      req.userId = decoded.userId;
      req.name = decoded.name;
      req.mannerTemp = decoded.mannerTemp;
      req.location = decoded.location;

      next();
    }
  )
}

module.exports = { verifyToken }