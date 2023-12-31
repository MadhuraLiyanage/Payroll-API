const express = require("express");
const router = express.Router();
const util = require("../helpers/common.helper");
const authController = require("../controller/auth/auth.controller");
const refreshTokenController = require("../controller/auth/refresh-token.controller");

router.post("/", authController.user_login);

router.post("/refresh-token", refreshTokenController.getNewToken);

module.exports = router;
