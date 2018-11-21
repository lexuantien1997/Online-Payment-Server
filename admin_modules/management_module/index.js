const express = require('express');
const router = express.Router();

const userinfoRoute=require('./src/routes/userinfo')
const rechargeRoute=require('./src/routes/userinfo')
const transactionRoute=require('./src/routes/transaction')
const checkinRoute=require('./src/routes/checkin')
router.use('/userinfo',userinfoRoute);
router.use('/recharge',rechargeRoute)
router.use('/transaction',transactionRoute)
router.use('/checkin',checkinRoute)
module.exports = router;