const loginValidate = require('../validations/login.validation');
const loginService = require('../services/login.service');
const errorNames = require('../validations/errors-name');
const passwordCrypt = require('../utils/password.crypt');
const Checkin = require('../../../../database/admin/checkin');
const api = {
  status: 1, // 1: fail _ 2: success
  errors: {},
  user: {}
};

function logError(info, data,res,errors) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {
    case 'SERVER_DIE':
      api.status = 1;
      api.user = null;    
      return res.status(400).json(api); 
  }
}
/**
 * @description To login we will check:
 * 
 */
function login(user,password,res) {
  if(user) {
    if(user.verified) { // Just login when user is verified phone
      if(passwordCrypt.comparePassowrd(password,user.password)) {
        api.status = 0;
        let { name, phone, money, gender, memberAt, address, email, birthday, isFirstTime } = user;
        api.user = {
          id: user._id,
          name,
          phone,
          money,
          gender,
          memberAt,
          address,
          email,
          birthday,
          isFirstTime
        };    
        api.errors = {};
        console.log("Tracking: " + user._id + " _ " + user.phone + " login successfully");
        return res.status(200).json(api);   
      } else {
        api.status = 1;
        api.errors.password = errorNames.PASSWORD_NOTCORRECT;
        api.user = {};
        console.log("Tracking: " + user._id + " _ " + user.phone + " login fail BECAUSE wrong password");
        return res.status(200).json(api);   
      }      
    } else {
      api.status = 1;
      api.errors.verified = errorNames.NOT_VERIFY;
      api.user = {};    
      console.log("Tracking: " + user._id + " _ " + user.phone + " login fail BECAUSE phone not verify");
      return res.status(200).json(api);   
    }
  } else {
    api.status = 1;
    api.errors.emailOrPhone = errorNames.EMAIL_PHONE_NOT_EXIST;
    api.user = {};     
    return res.status(200).json(api); 
  }
}

module.exports = (req,res) => {
  console.log(req.body);
  var { emailOrPhone} = req.body;
  if (emailOrPhone == undefined )
      res.send("Something wrong:\n"
          + ((emailOrPhone == undefined) ? "Email or Phone: undefined" : ("Email or Phone: " + Name)) + "\n"
      );
  else {
      const newCheckin = new Checkin({
          Name: emailOrPhone,
          Phone:Phone,    
          date: new Date(),
          type:1

      });
      newCheckin.save().then(item =>
          res.json(JSON.stringify(req.body))
      ).catch(err => {
          console.log(err);
      });
  }
  for(let key in req.body) req.body[key] = req.body[key].trim();   
  if(req.body.type == 'email') loginService.checkEmail(req.body.emailOrPhone).then (user => login(user,req.body.password,res));   
  else loginService.checkPhone(req.body.emailOrPhone).then (user => login(user,req.body.password,res));   
}