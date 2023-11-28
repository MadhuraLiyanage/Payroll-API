const express = require('express');
const router = express.Router();
const util = require("../helpers/common.helper")
const authController = require('../controller/auth/auth.controller');
const refresTokenController = require("../controller/auth/refresh-token.controller")

router.post('/', authController.user_login);
router.post('/refresh-token', refresTokenController.gerNewToken)

module.exports = router;
