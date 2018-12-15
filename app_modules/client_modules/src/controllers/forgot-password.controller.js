const User = require('../../../../database/app/user');
const forgotPassService = require('../services/ForgotPasswordService');
const { SEND_FORGOT_PASSWORD_SUCCESS, PHONE_NOT_EXIST, PHONE_NOT_VERIFY, SEND_FORGOT_PASSWORD_AFTER_1H, USER_BLOCKED } = require("../cbInstance");
const { EMAIL_PHONE_NOT_EXIST, PHONE_NOT_VERIFY_YET } = require('../validations/errors-name');
const api = {
  status: 1,
  errors: {}
}

const callBack = (info, data,res) => {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {
    case SEND_FORGOT_PASSWORD_AFTER_1H: 
    {
      api.status = 1;
      api.errors.emailOrPhone = "You can send forgot password by phone after " + data;
      return res.status(200).json(api); 
    }
    case SEND_FORGOT_PASSWORD_SUCCESS:
    {
      api.status = 0;
      return res.status(200).json(api);    
    }
    case PHONE_NOT_EXIST: 
    {
      api.status = 1;
      api.errors.emailOrPhone = EMAIL_PHONE_NOT_EXIST;
      return res.status(200).json(api); 
    }
    case PHONE_NOT_VERIFY_YET:
    {
      api.status = 1;
      api.errors.emailOrPhone = PHONE_NOT_VERIFY_YET;
      return res.status(200).json(api); 
    }
    case USER_BLOCKED:
    {
      api.status = 1;
      api.errors.emailOrPhone = 'Sorry!! You was BLOCKED';
      return res.status(200).json(api); 
    }
  }
}

module.exports = (req,res) => {
  let { type, emailOrPhone } = req.body;
  console.log(req.body);
  forgotPassService.SendForgotPassword(type,emailOrPhone, (info,data) => callBack(info,data,res));
}