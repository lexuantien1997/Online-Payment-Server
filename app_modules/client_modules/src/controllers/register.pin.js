const registerPinService = require('../services/RegisterPinService');
const  { UPDATE_USER_DATA_SUCCESS }= require("../cbInstance");

const  callback = (info,data, res) => {
  console.log(info + " - data: " + data);
  switch (info) {
    case UPDATE_USER_DATA_SUCCESS: 
      return res.status(200).json({ status: 0, id:data});  
  }
};

module.exports =  (req,res) => {
  registerPinService.updatePinUser(req.body.id,req.body.securityPass, (info,data) => callback(info,data,res));
};