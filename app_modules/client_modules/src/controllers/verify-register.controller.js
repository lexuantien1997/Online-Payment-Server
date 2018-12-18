const registerService= require('../services/RegisterService');
const User = require('../../../../database/app/user');
const { SEND_TOKEN_SUCCESS } = require("../cbInstance");


function callback(info, data,res) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {       
    case SEND_TOKEN_SUCCESS: 
    {
      let api = { status: 0 };
      return res.status(200).json(api);
    }
  }
}


const verifyCodeController = (req,res) => { 
  let { phone } = req.body;
  // +84: for country VN
  registerService.beforeSendToken( "+84" + phone*1, (info,data) => callback(info, data, res));
}

module.exports =  { 
  verifyCodeController
}