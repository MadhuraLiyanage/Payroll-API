const express = require("express");
const router = express.Router();
const logoutController = require("./../controller/auth/logout.controller");

router.post("/", logoutController.logoutUser);

module.exports = router;
