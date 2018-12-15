const crypto = require('crypto');
const firebase = require("../../../../configs/firebase.config");
const {
  UPDATE_USER_DATA_ERROR, 
  UPDATE_USER_DATA_SUCCESS, 
  SEND_FORGOT_PASSWORD_ERROR, 
  SEND_FORGOT_PASSWORD_SUCCESS ,
  EMAILPHONE_NOT_EXIST,
  PHONE_NOT_VERIFY,
  PHONE_NOT_EXIST,
  SEND_FORGOT_PASSWORD_AFTER_1H,
  USER_BLOCKED
} = require("../cbInstance");
const passwordCrypt =  require('../utils/password.crypt');
const Nexmo = require('nexmo');
require("dotenv").config();
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_KEY,
  apiSecret: process.env.NEXMO_SECRET
});

function safeRandomBytes(length) {
  while(true) {
    try {
      return crypto.randomBytes(length);
    } 
    catch(e){
      continue;
    }
  }
}

const updateUserData = (newPass,  uid, callback) => {
  let userRef = firebase.getDatabase().ref("user/" + uid);
  userRef.update({ password: newPass, nextResetPasswordSend: Date.now()  + 3600000 }, error => { // can send next 1hours
    if(error) callback(UPDATE_USER_DATA_ERROR,error);
    else {
      callback(UPDATE_USER_DATA_SUCCESS);
      callback(SEND_FORGOT_PASSWORD_SUCCESS);
    }
  });
};


const sendForgotPasswordbyPhone = (uid,phone,callback) => {
  let pass = Math.random().toString(36).slice(-8);
  let text = 'Reset your OP password: ' + pass;
  nexmo.message.sendSms('Online Payment', phone,text, (err,response) => {
    if(err) callback(SEND_FORGOT_PASSWORD_ERROR,err);
    else {
      console.log(response);
      if(response.messages[0].status == 0) {
        let newPassword = passwordCrypt.hashPassword(pass);        
        updateUserData(newPassword,uid,callback);
      }
    }
  });
};


const checkPhoneVerify = (phone) => new Promise( (resolve,reject) => {
  console.log(phone);
  let userRef = firebase.getDatabase().ref("user");
  userRef.orderByChild("phone").equalTo(phone).once("value", snapshot => {
    resolve(snapshot.val());
  });
});

const SendForgotPassword = (type, emailOrPhone,callback) => {
  if(type == "phone") {
    checkPhoneVerify("+84" + emailOrPhone*1).then(data => {
      if(data != null) {
        let uid = Object.keys(data)[0];
        if(data[uid].type == 1) { // blocked
          callback(USER_BLOCKED);
        } else { // not block
          if(data[uid].verified) { // 1hours
            if( Date.now() - data[uid].nextResetPasswordSend > 3600000) {
              console.log("send forgot pass for uid: " + uid);
              sendForgotPasswordbyPhone(uid,"+84" + emailOrPhone*1,callback);
            } else {
              callback(SEND_FORGOT_PASSWORD_AFTER_1H, data[uid].nextResetPasswordSend);
            }         
          } else { // phone hasn't been verified yet
            callback(PHONE_NOT_VERIFY);
          }
        }
      } else { // wrong phone number
        callback(PHONE_NOT_EXIST);
      }
    });
  } else {

  }
}

module.exports = {
  SendForgotPassword
}