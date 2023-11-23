const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');
const loginservice = require("../../services/login.service");
const env = require("../../../config/environment");
const { Console } = require('node:console');

exports.user_login = async (req, res, next) => {
  var error;
  var jwtToken, status, msg;
  const userName = req.body.userName;
  const password = req.body.password;
  var id = 0;
  var userFullName = '';
  var userEmail ='';
  var userContactNo = '';

  try {
    if (!userName || !password) {
      msg = "Invalid user name/password";
      status = 200;
    }
    
    var isValidUser = await loginservice.getUser(userName, password);
    
    if (isValidUser.length == 0){
        msg = "Invalid user name/password.";
        status = 200;
    } else {
        id = isValidUser[0].id;
        userFullName = isValidUser[0].userName;
        userEmail = isValidUser[0].userEmail;
        userContactNo = isValidUser[0].userContactNo;
        jwtToken = jwt.sign(
                  {
                    id: userName,
                    role: 'user',
                  },
                  env.JwtSecret,
                  {
                    expiresIn: '20m',
                  }
                );
        msg = "Login Successful"
        status = 200;
    }
  
    var returnResults = await loginservice.loginReturn({ userName:userName, id:id, userFullName:userFullName, userEmail:userEmail, jwtToken:jwtToken, msg:msg  });
    res.status(status).json(returnResults);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status:"99",
      tokenStatus:"",
      userID:userName,
      responseMessage : "Error authenticating user. Please check the credentials and try again." ,
      data:[]      
    });
  }
};
