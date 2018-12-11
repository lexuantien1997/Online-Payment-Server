const express = require('express');
const loginController = require('../controllers/login.controller');
const logoutController = require('../controllers/logout.controller');
const registerController = require('../controllers/register.controller');
const registerPinController = require('../controllers/register.pin');
const verifyRegisterController = require('../controllers/verify-register.controller');
const forgotPassController = require('../controllers/forgot-password.controller');
const updateInformationUser = require('../controllers/update-information-user.controller');
const router = express.Router();
const blockController = require("../controllers/block.controller");
const unblockController = require("../controllers/unblock.controller");
const { sendMessage } = require("../controllers/cloudMessaging.controller");
router.post('/login', (req,res) => { // fixed  
  console.log("Tracking: User " + req.body.emailOrPhone + " start login");
  loginController(req, res);
});

router.post('/block', (req,res) => { // fixed  
  console.log("Tracking: User " + req.body.id + " was blocked");
  blockController(req,res);
});

router.post('/unblock', (req,res) => { // fixed  
  console.log("Tracking: User " + req.body.id + " was un blocked");
  unblockController(req,res);
});



router.post('/logout', (req,res) => { // fixed  
  console.log("Tracking: User " + req.body.id + " want to logout");
  logoutController(req, res);
});

router.post('/register', (req,res) => {  // fixed
  console.log("Tracking: User with phone: " + req.body.phone + " register");
  registerController(req, res);
});

router.post('/register-PIN', (req,res) => {  // fixed
  console.log("Tracking: User with id: " + req.body.id + " register PIN with code: " + req.body.securityPass);
  registerPinController(req, res);
});

router.post('/send-verify', (req,res) => {  // fixed
  console.log("Tracking: User with phone: " + req.body.phone + " need send phone verify");
  verifyRegisterController.verifyCodeController(req, res);
});

router.post('/forgot-password', (req,res) => { // fixed
  forgotPassController(req,res);
});

router.post('/update-information-user', (req,res) => {
  console.log("Tracking: User " + req.body.email + " start update information user");
  updateInformationUser(req,res);
});

router.post('/send-message', (req,res) => {
  console.log("Tracking: send message to device with token: " + req.body.registerToken);
  sendMessage(req.body.registerToken , {
    type:"BLOCK"
  });
});

// Config express route in ver 4.x
module.exports = router;
