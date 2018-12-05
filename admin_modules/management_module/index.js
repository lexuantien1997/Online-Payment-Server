const express = require('express');
const router = express.Router();

const userinfoRoute=require('./src/routes/userinfo')
const rechargeRoute=require('./src/routes/userinfo')
const transactionRoute=require('./src/routes/transaction')
const checkinRoute=require('./src/routes/checkin')
const promotionRoute=require('./src/routes/promotion')

router.use('/userinfo',userinfoRoute);
router.use('/recharge',rechargeRoute)
router.use('/transaction',transactionRoute)
router.use('/checkin',checkinRoute)
router.use('/promotion',promotionRoute)

module.exports = router;