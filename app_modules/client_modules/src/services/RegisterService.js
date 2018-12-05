const { 
  PHONE_REGISTERED, 
  REQUEST_REALTIMEDTB_ERROR, 
  NEXMO_SERVER_ERROR, 
  ADD_VERIFY_DATA_SUCCESS,
  SEND_TOKEN_SUCCESS,
  SEND_TOKEN_ERROR,
  ADD_USER_DATA_ERROR,
  ADD_USER_DATA_SUCCESS,
  REGISTER_SUCCESS,
  VERIFY_TOKEN_ERROR,
  CANCEL_VERIFICATION_ERROR
} = require("../cbInstance");
const firebase = require("../../../../configs/firebase.config");
const passwordCrypt =  require('../utils/password.crypt');
const Nexmo = require('nexmo');
require("dotenv").config();
const nexmo = new Nexmo({
  apiKey:  process.env.NEXMO_KEY,
  apiSecret:  process.env.NEXMO_SECRET
});

const checkPhoneExist = (phone) => new Promise((resolve,reject) => {
  let userRef = firebase.getDatabase().ref().child("user");
  userRef
    .orderByChild("phone")
    .equalTo(phone)
    .once("value", (data) => resolve(data.val()));
})

const checkEmailExist = (email) => new Promise((resolve,reject) => {
  firebase.getAuth()
    .getUserByEmail(email)
    .then(userRecord => userRecord != null ? resolve(true) : resolve(false))
    .catch(err => reject())
})

const addNewVerifyData = (phone, request_id, expired, calback) => {
  let verify = firebase.getDatabase().ref().child("verify");
  verify.push({
    phone,
    request_id,
    expired
  }, error => {
    if(error) calback(ADD_VERIFY_DATA_ERROR,error)
    else {
      calback(ADD_VERIFY_DATA_SUCCESS);
      calback(SEND_TOKEN_SUCCESS);
    } 
  });
}

const updateVerifyData = (phone, request_id, expired, calback, uid) => {
  let verify = firebase.getDatabase().ref().child("verify");
  verify.push({
    phone,
    request_id,
    expired
  }, error => {
    if(error) calback(ADD_VERIFY_DATA_ERROR,error)
    else {
      calback(ADD_VERIFY_DATA_SUCCESS);
      calback(SEND_TOKEN_SUCCESS);
    } 
  });
}

const addNewUserData = (name,phone,password,requestId,callback) => {
  password = passwordCrypt.hashPassword(password);
  let user = firebase.getDatabase().ref().child("user");
  user.push({
    phone,
    name,
    requestId,
    password,
    verify: true
  }, error => {
    if(error) calback(ADD_USER_DATA_ERROR,error)
    else {
      calback(ADD_USER_DATA_SUCCESS);
      calback(REGISTER_SUCCESS,phone);
    } 
  });
}


const sendToken = (phone,callback,verifyData) => {
  console.log(verifyData);
  nexmo.verify.request({number:phone, brand: 'Online payment'}, (err, result) => {
    if(err) callback(NEXMO_SERVER_ERROR,err);
    else { 
      if(result.status == '0') { // success        
        console.log('Start send token for number: ' + phone + " whith request id: " + result.request_id);
        if(verifyData) updateVerifyData(phone,result.request_id,Date.now());
        else addNewVerifyData(phone, result.request_id,Date.now(), callback);
      } else  callback(SEND_TOKEN_ERROR, {message: result.error_text, requestId: result.request_id});         
    }
  });
}

/**
 * @param {*string} phone user phone's number
 * @param {*function} callback calback function for tracking
 * @description Check phone number has been send with expire time,
 * ex: continue send after 300 seconds 
 */
const beforeSendToken = (phone, callback) => {
  checkPhoneExist(phone)
    .then(status => {
      if(status != null) {
        callback(PHONE_REGISTERED);
      } else { // not register or last time not update code
        let verifyRef = firebase.getDatabase().ref().child("verify");
        verifyRef.orderByChild("phone").equalTo(phone).on("value", data => {
          // console.log(data.val());
          let val = data.val();
          if(val) {
            let uid = Object.keys(val)[0]; // stupid code
            if(Date.now() - val[uid].expired > process.env.EXPIRED) sendToken(phone,callback,val);           
          } else sendToken(phone,callback,null);
        });
      }
    })
}

const cancelVerificationRequest = (data, callback) => {
  nexmo.verify.control({request_id:data.requestId, cmd: 'cancel'}, (err, result) => {
    if(err) callback(CANCEL_VERIFICATION_ERROR,err);
    else {      
      console.log(result);
      if(result.status == '0') {
//        data.request_Id = null;
      } else { callback('CANCEL_ERROR',{requestId: result.request_Id}); }
    }
  });
}

const verifyToken = (data, request_id,callback) => {
  nexmo.verify.check({request_id, code: data.verifyCode}, (err, result) => {
    if(err) callback(NEXMO_SERVER_ERROR);
    else {
      console.log('Verify token data: ' + result);
      if(result && result.status == '0') { // check otp success
        addNewUserData(data.name,data.phone,data.password,request_id,callback);
      } else callback(VERIFY_TOKEN_ERROR,{message: result.error_text, requestId: result.request_Id});
    }
  });
}


module.exports = {
  beforeSendToken
}