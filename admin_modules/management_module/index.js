const express = require('express');
const router = express.Router();

const usertouserRoute = require('./src/routes/usertouser');
const userinfoRoute=require('./src/routes/userinfo')
const rechargeRoute=require('./src/routes/userinfo')
const transactionRoute=require('./src/routes/transaction')

router.use('/usertouser',usertouserRoute);
router.use('/userinfo',userinfoRoute);
router.use('/recharge',rechargeRoute)
router.use('/transaction',transactionRoute)
module.exports = router;