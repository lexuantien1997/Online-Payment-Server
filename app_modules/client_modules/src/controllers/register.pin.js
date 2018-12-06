const registerPinService = require('../services/RegisterPinService');
const  { UPDATE_USER_DATA_SUCCESS }= require("../cbInstance");

const  callback = (info, res) => {
  console.log(info);
  switch (info) {
    case UPDATE_USER_DATA_SUCCESS: 
      return res.status(200).json({ status: 0});  
  }
};

module.exports =  (req,res) => {
  registerPinService.updatePinUser(req.body.id,req.body.securityPass, info => callback(info,res));
};