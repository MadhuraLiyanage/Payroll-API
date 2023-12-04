const express = require("express");
const router = express.Router();
const whoAmIController = require("../controller/auth/whoami.controller");
const auth = require("../middleware/authenticate.mw");

router.get("/", whoAmIController.jwtDetails);

module.exports = router;
