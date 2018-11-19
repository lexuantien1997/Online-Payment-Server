const registerPinService = require('../services/register.pin.service');

function callback(user, res){
  console.log(user);
  return res.status(200).json({
    status: 0,
    id: user._id
  }); 
}

module.exports =  (req,res) => {
  registerPinService.updateUser(req.body.id,req.body.securityPass, user => callback(user,res));
}