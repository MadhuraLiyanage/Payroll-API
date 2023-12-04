const express = require("express");
const router = express.Router();
const whoAmIController = require("../controller/auth/whoami.controller");

router.get("/", whoAmIController.jwtDetails);

module.exports = router;
