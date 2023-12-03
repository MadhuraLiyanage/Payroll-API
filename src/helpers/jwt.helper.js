const jwt = require('jsonwebtoken');
const jwtHelper = function () { };
const createError = require("http-errors");
const redis = require('redis');


jwtHelper.getToken = async (userName, userFullName, userEmail, userContactNo, userRole, issuer, tokenSecret, tokenExpiry ) => {
    return new Promise((resolve, reject) => {
      try{
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
      } catch (err) {
        throw err;
      }
        
    })
  }

  jwtHelper.veryfyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload)=> {
        if (err) {
          throw err;
        }
        else {
          const id = payload.id;
          const userFullName = payload.userFullName;
          const userEmail = payload.userEmail;
          const userContactNo = payload.userContactNo;
          const role = payload.userRole;
          const audience = payload.userName;
          //blacl listing to be done
          resolve({ id:id, 
                        userFullName:userFullName, 
                        userEmail:userEmail, 
                        userContactNo:userContactNo, 
                        role:role, 
                        audience:audience
                      });
        }
      })
    })
  }
  module.exports = jwtHelper;