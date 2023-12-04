const util = require("../../helpers/common.helper");
const redisHelper = require("./../../helpers/redis.helper");
exports.logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    const decodedJwt = util.decodeJWT(refreshToken);
    var data = [];
    if (decodedJwt) {
      const userId = decodedJwt.id;

      redisHelper.deleteRefreshToken("PayrollRefreshTokens:" + userId);
      data = [
        {
          userId: userId,
          refreshToken: refreshToken,
          tokenStatus: "Token black listed"
        }
      ];
    }
    res
      .status(200)
      .json({ status: "00", responseMessage: "Successful", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "99",
      responseMessage: "Error black listing refresh token",
      data: []
    });
  }
};
