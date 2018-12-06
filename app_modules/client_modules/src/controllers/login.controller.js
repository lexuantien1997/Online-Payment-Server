const loginValidate = require('../validations/login.validation');
const loginService = require('../services/LoginService');
const {NOT_VERIFY_EMAIL, PASSWORD_NOTCORRECT, EMAIL_PHONE_NOT_EXIST} = require('../validations/errors-name');
const passwordCrypt = require('../utils/password.crypt');
const Checkin = require('../../../../database/admin/checkin');
const api = {
  status: 1, // 1: fail _ 0: success
  errors: {},
  user: {}
};

/**
 * @description To login we will check:
 * 
 */
const login = (_user,password,type,res) => {

  let uid = Object.keys(_user)[0];
  console.log(password);
  if(type == "email" && user.emailVerify == false) {
    api.status = 1;
    api.errors.emailOrPhone = NOT_VERIFY_EMAIL;
    api.user = {};
    console.log("Tracking: " + uid + " _ " + phone + " not verify email");
    return res.status(200).json(api);   
  } else if(type == "phone") {
    if(passwordCrypt.comparePassowrd(password,_user[uid].password)) { 
      console.log(1)
      api.status = 0;
      let { name, phone, money, gender, memberAt, address, email, birthday, isFirstTime,avatar,typeMoney } = _user[uid];
      api.user = {id: uid, name,phone,money, gender,memberAt,address,email,birthday,isFirstTime,avatar,typeMoney} ;  
      api.errors = {};
      console.log("Tracking: " + uid + " _ " + phone + " login successfully");
      return res.status(200).json(api);   
    } else {
      api.status = 1;
      api.errors.password = PASSWORD_NOTCORRECT;
      api.user = {};
      console.log("Tracking: " + uid + " _ " + phone + " login fail BECAUSE wrong password");
      return res.status(200).json(api);   
    }
  }
}


module.exports = (req,res) => {



  // if (emailOrPhone == undefined ) console.log("Something wrong:\n"
  //         + ((emailOrPhone == undefined) ? "Email or Phone: undefined" : ("Email or Phone: " + Name)) + "\n"
  //     );
  // else {
  //     // const newCheckin = new Checkin({
  //     //     emailOrPhone: emailOrPhone,  
  //     //     date: new Date(),
  //     //     type:type

  //     // });
  //     // newCheckin.save().then(item =>
  //     //     { /*return res.json(JSON.stringify(req.body))*/}
  //     // ).catch(err => {
  //     //     console.log(err);
  //     // });
  // }

  for(let key in req.body) req.body[key] = req.body[key].trim();   
  req.body.emailOrPhone = "+84" + req.body.emailOrPhone*1;

  let { emailOrPhone,type,password} = req.body;

  if(type == 'email') {
    loginService.checkEmailExist(emailOrPhone) .then(status => {
      if(status != null) { // exist
        login(status,password,type,res)
      } else {
        api.status = 1;
        api.errors.emailOrPhone = EMAIL_PHONE_NOT_EXIST;
        api.user = {};     
        return res.status(200).json(api); 
      }
    });
  }   
  else {
    loginService.checkPhoneExist(emailOrPhone) .then(status => {
      console.log(status);
      if(status != null) { // exist
        login(status,password,type,res)
      } else {
        api.status = 1;
        api.errors.emailOrPhone = EMAIL_PHONE_NOT_EXIST;
        api.user = {};     
        return res.status(200).json(api); 
      }
    });
  }
}