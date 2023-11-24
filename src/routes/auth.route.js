const express = require('express');
const router = express.Router();
const util = require("../util/common.util")
const authController = require('../controller/auth/auth.controller');

router.post('/', authController.user_login);

module.exports = router;
