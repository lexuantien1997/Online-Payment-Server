const express = require('express');
const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');
const registerPinController = require('../controllers/register.pin');
const verifyRegisterController = require('../controllers/verify-register.controller');
const forgotPassController = require('../controllers/forgot-password.controller');
const updateInformationUser = require('../controllers/update-information-user.controller');
const router = express.Router();

router.post('/login', (req,res) => {  
  console.log("Tracking: User " + req.body.emailOrPhone + " start login");
  loginController(req, res)
});

router.post('/register', (req,res) => {  
  console.log("Tracking: User with phone: " + req.body.phone + " register");
  registerController(req, res)
});

router.post('/register-PIN', (req,res) => {  
  console.log("Tracking: User with id: " + req.body.id + " register PIN with code: " + req.body.securityPass);
  registerPinController(req, res)
});

router.post('/send-verify', (req,res) => {  
  console.log("Tracking: User with phone: " + req.body.phone + " need send phone verify");
  verifyRegisterController.verifyCodeController(req, res)
});

router.post('/forgot-password', (req,res) => {
  forgotPassController(req,res);
});

router.post('/update-information-user', (req,res) => {
  console.log("Tracking: User " + req.body.email + " start update information user");
  updateInformationUser(req,res);
});

router.get('/123', (req,res) => {
  res.json({msg:"success"});
});

// Config express route in ver 4.x
module.exports = router;
