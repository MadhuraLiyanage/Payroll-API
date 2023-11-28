const jwt = require('jsonwebtoken');
const jwtHelper = function () { };

jwtHelper.getToken = async (userName, userFullName, userEmail, userContactNo, userRole, issuer, tokenSecret, tokenExpiry ) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign(
          {
            id: userName,
            userFullName: userFullName,
            userEmail: userEmail,
            userContactNo: userContactNo,
            role: userRole,
            issuer: issuer,
            audience: userName,
          },
          tokenSecret,
          {
            expiresIn: tokenExpiry,
          }
        );
        resolve(token);
    })
  }
  module.exports = jwtHelper;