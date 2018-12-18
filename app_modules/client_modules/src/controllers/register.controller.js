const registerValidate = require('../validations/register.validation');
const firebase = require("../../../../configs/firebase.config");
const registerService = require('../services/RegisterService');
const User = require('../../../../database/app/user');
const {PHONE_NUMBER_NOTSEND} = require('../validations/errors-name');

const { REGISTER_SUCCESS,PHONE_NUMBER_NOT_SEND } = require("../cbInstance");

const api = {
  status: 1,
  errors: {}
};

function callback(info, data,res,errors) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {
    case REGISTER_SUCCESS: 
    {
      api.status = 0;
      api.errors = errors;
      return res.status(200).json(api); 
    }
    case PHONE_NUMBER_NOT_SEND:
    {
      api.status = 0;
      api.errors.phone = PHONE_NUMBER_NOTSEND;
      return res.status(200).json(api); 
    }
  }
}


/**
 * @description: register client user by:
 * 1: Check information client send is correctly or not (logic)
 *      + If error -> response errors to client user
 *      + If not -> continue   
 * 2. Check user name / phone is used or not by access database
 *      + If error -> response errors to client user
 *      + If not -> continue   
 * 3. Register successfully
 * 4. Check verify code by using authy
 *      + 1 code just exist about 20 second
 *      + Can send again
 */
module.exports =  (req,res) => {
  // api response to app
  // status: 0 -> success
  // status: 1 -> found error
	let errors;
  req.body.phone = "+84" + req.body.phone*1;
  console.log(req.body);
	// Check user name / phone is used or not by access database
  registerService.registerUser(req.body, (info, data) => callback(info,data,res));
}