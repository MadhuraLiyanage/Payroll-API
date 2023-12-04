const { validationResult } = require("express-validator");
const loginservice = require("../../services/login.service");
var crypto = require("crypto");
const jwtHelper = require("../../helpers/jwt.helper");
const redisHelper = require("../../helpers/redis.helper");

exports.user_login = async (req, res, next) => {
  var error;
  var accessToken, refreshToken, reqStatus, msg;
  const userName = req.body.userName;
  const password = req.body.password;
  var id = 0;
  var userFullName = "";
  var userEmail = "";
  var userContactNo = "";

  try {
    if (!userName || !password) {
      msg = "Invalid user name/password";
      reqStatus = 200;
    }

    var isValidUser = await loginservice.getUser(userName);

    if (isValidUser.length == 0) {
      msg = "Invalid user credentials (user name/password)";
      resStatus = 200;
    } else {
      //convert password to hash
      //hashing to Hex
      //const hashPassword = crypto.createHash('md5').update(password).digest('hex')
      //Hashing to base64 (binary)
      const hashPassword = crypto
        .createHash("md5")
        .update(password, "binary")
        .digest("base64");

      //Validate password
      const userPassword = isValidUser[0].userPassword;

      if (userPassword != hashPassword) {
        //Invalid
        msg = "Invalid user credentials (user name/password)";
        resStatus = 200;
      } else {
        //Valid
        id = isValidUser[0].id;
        userFullName = isValidUser[0].userName;
        userEmail = isValidUser[0].userEmail;
        userContactNo = isValidUser[0].userContactNo;

        //get access token
        accessToken = await jwtHelper.getToken(
          userName,
          userFullName,
          userEmail,
          userContactNo,
          "user",
          process.env.ISSUER,
          process.env.ACCESS_TOKEN_SECRET,
          process.env.JWT_TOKEN_EXP
        );
        //get refresh token
        refreshToken = await jwtHelper.getToken(
          userName,
          userFullName,
          userEmail,
          userContactNo,
          "user",
          process.env.ISSUER,
          process.env.REFRESH_TOKEN_SECRET,
          process.env.REFRESH_TOKEN_EXP
        );
        //store in redis store
        //Refresh tokens will be saved under RefreshTokens branch
        const redisToken = "PayrollRefreshTokens:" + userName;
        //Delete existing refresh token
        try {
          redisHelper.deleteRefreshToken(redisToken);
        } catch {
          //ignore errors
        }
        redisHelper.setRefreshToken(redisToken, refreshToken);

        msg = "Login Successful";
        resStatus = 200;
      }
    }
    var returnResults = await loginservice.loginReturn({
      userName: userName,
      id: id,
      userFullName: userFullName,
      userEmail: userEmail,
      accessToken: accessToken,
      refreshToken: refreshToken,
      msg: msg
    });

    res.status(resStatus).json(returnResults);
  } catch (error) {
    res.status(500).json({
      status: "99",
      tokenStatus: "",
      userID: userName,
      responseMessage:
        "Error authenticating user. Please check the credentials and try again.",
      data: []
    });
  }
};
