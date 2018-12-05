//const registerService= require('../services/register.service');
const registerService= require('../services/RegisterService');
const User = require('../../../../database/app/user');



function callback(info, data,res) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  // switch (info) {       
  //   case 'REGISTER_SUCCESS':
  //     api = { 
  //       status: 0,
  //       error: {},
  //       user:data
  //     };
  //     return res.status(200).json(api);
  // }
}


const verifyCodeController = (req,res) => { 
  let { phone } = req.body;
  // +84: for country VN
  registerService.beforeSendToken( "+84" + phone, (info,data) => callback(info, data, res));
}

module.exports =  { 
  verifyCodeController
}