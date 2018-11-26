const express = require('express');
const router = express.Router();

const recharge = require('./src/routes/recharge');
const usertouser = require('./src/routes/usertouser');
const usertoagent = require('./src/routes/usertoagent');
const search = require('./src/routes/search');

router.use('/recharge',recharge);
router.use('/usertouser',usertouser);
router.use('/usertoagent',usertoagent);
router.use('/search',search)
module.exports = router;