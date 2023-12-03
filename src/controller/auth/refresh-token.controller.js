const { response } = require("express");
const jwtHelper = require("../../helpers/jwt.helper");

exports.gerNewToken = async (req, res, next) => {
  //res.status(200).json({ message: "OK"})
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.status(200).json({ status: "99", message: "Invald refresh token." });
  } else {
    try {
      const result = await jwtHelper.veryfyRefreshToken(refreshToken);
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
      const neRefreshToken = await jwtHelper.getToken(
        result.id,
        result.fullUserName,
        result.userEmail,
        result.userContactNo,
        "user",
        process.env.ISSUER,
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXP
      );
      const data = [
        {
          accessToken: newAccessToken,
          refreshToken: neRefreshToken,
        },
      ];
      res
        .status(200)
        .json({ status: "00", responseMessage: "Sucessful", data: data });
    } catch (err) {
      res
        .status(200)
        .json({
          status: "99",
          responseMessage: "Error creating access token using refresh token.",
          data: [],
        });
    }
  }
};
