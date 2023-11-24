const express = require('express');
const router = express.Router();
const whoAmIControiller = require("../controller/auth/whoami.controller")
const auth = require('../middleware/authenticate.mw');

router.get('/', whoAmIControiller.jwtDetails);

module.exports = router;
