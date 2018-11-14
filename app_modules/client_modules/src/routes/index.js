const express = require('express');
const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');
const verifyRegisterController = require('../controllers/verify-register.controller');
const forgotPassController = require('../controllers/forgot-password.controller');
const router = express.Router();

router.post('/login', (req,res) => {  
  console.log("Tracking: User " + req.body.emailOrPhone + " start login");
  loginController(req, res)
});

router.post('/register', (req,res) => {  
  console.log("Tracking: User with phone: " + req.body.phone + " register");
  registerController(req, res)
});

router.post('/send-verify', (req,res) => {  
  console.log("Tracking: User with phone: " + req.body.phone + " need send phone verify");
  verifyRegisterController.verifyCodeController(req, res)
});

router.post('/forgot-password', (req,res) => {
  forgotPassController(req,res);
});

router.get('/123', (req,res) => {
  res.json({msg:"success"});
});

// Config express route in ver 4.x
module.exports = router;
