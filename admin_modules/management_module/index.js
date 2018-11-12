const express = require('express');
const router = express.Router();

const usertouserRoute = require('./src/routes/usertouser');
const userinfoRout=require('./src/routes/userinfo')

router.use('/usertouser',usertouserRoute);
router.use('/userinfo',userinfoRout);

module.exports = router;