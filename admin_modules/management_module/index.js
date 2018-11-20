const express = require('express');
const router = express.Router();

const userinfoRoute=require('./src/routes/userinfo')
const rechargeRoute=require('./src/routes/userinfo')
const transactionRoute=require('./src/routes/transaction')

router.use('/userinfo',userinfoRoute);
router.use('/recharge',rechargeRoute)
router.use('/transaction',transactionRoute)
module.exports = router;