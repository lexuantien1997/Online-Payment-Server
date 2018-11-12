const express = require("express");
const router = express.Router();
const userClientRoute = require('./src/routes');

router.use('/user',userClientRoute);

module.exports = router;