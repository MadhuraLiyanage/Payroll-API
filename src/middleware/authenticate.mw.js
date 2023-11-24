const jwt = require('jsonwebtoken');
const env = require("../../config/environment");
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
        status: '99',
        responsemessage: 'Unauthorized request.',
      });
  } else {
    const token = authHeader.split(' ')[1];
    try {
      const user = jwt.verify(token, env.JwtSecret);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
          status: '99',
          responsemessage: 'Unauthorized request.',
        });
    }
  }
};