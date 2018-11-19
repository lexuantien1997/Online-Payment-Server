const express = require('express');
const router = express.Router();

const recharge = require('./src/routes/recharge');

router.use('/recharge',recharge);

module.exports = router;