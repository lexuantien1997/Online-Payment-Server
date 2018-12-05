const registerValidate = require('../validations/register.validation');
const firebase = require("../../../../configs/firebase.config");
const registerService = require('../services/register.service');
const User = require('../../../../database/app/user');
const errorNames = require('../validations/errors-name');

const api = {
  status: 1,
  errors: {}
};

function logError(info, data,res,errors) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {
    case 'REGISTER_SUCCESS': 
    {
      api.status = 0;
      api.errors = errors;
      return res.status(200).json(api); 
    }
  }
}



const registerUser = (data,country,callback) => {

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
  let { phone } = req.body;
  console.log(req.body);
	// Check user name / phone is used or not by access database
  registerService.registerUser(req.body,'VN', (info, data) => logError(info,data,res,errors));
}