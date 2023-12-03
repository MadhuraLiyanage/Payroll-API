const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      status: "99",
      responsemessage: "Unauthorized request. Invalid access token.",
    });
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        status: "99",
        responsemessage: "Unauthorized request. Invalid access token.",
      });
    }
  }
};
