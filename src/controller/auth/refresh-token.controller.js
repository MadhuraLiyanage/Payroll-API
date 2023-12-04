const { response } = require("express");
const jwtHelper = require("../../helpers/jwt.helper");
const redisHelper = require("../../helpers/redis.helper");

exports.getNewToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.status(200).json({ status: "99", message: "Invalid refresh token." });
  } else {
    try {
      //verify the refresh token validity
      const result = await jwtHelper.verifyRefreshToken(refreshToken);

      //New access token generated using refresh token
      const newAccessToken = await jwtHelper.getToken(
        result.id,
        result.fullUserName,
        result.userEmail,
        result.userContactNo,
        "user",
        process.env.ISSUER,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.JWT_TOKEN_EXP
      );
      //New refresh token generated using refresh token
      const newRefreshToken = await jwtHelper.getToken(
        result.id,
        result.fullUserName,
        result.userEmail,
        result.userContactNo,
        "user",
        process.env.ISSUER,
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXP
      );
      //store in redis store
      //Refresh tokens will be saved under RefreshTokens branch
      const redisToken = "PayrollRefreshTokens:" + result.id;

      //delete existing refresh token
      try {
        redisHelper.deleteRefreshToken(redisToken);
      } catch {
        //no error trap
      }

      //save new refreshToken to Redis
      redisHelper.setRefreshToken(redisToken, newRefreshToken);
      const data = [
        {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken
        }
      ];
      res
        .status(200)
        .json({ status: "00", responseMessage: "Successful", data: data });
    } catch (err) {
      console.log(err);
      res.status(200).json({
        status: "99",
        responseMessage:
          "Refresh token black listed. Error creating new access tokens using refresh token.",
        data: []
      });
    }
  }
};
