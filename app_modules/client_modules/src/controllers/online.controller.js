

function callback(info, data, res) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  res.status(200).json({success: 0});
}
const { AddOnlineUser } = require('../services/OnlineUserService');

module.exports = (req,res) => {
  AddOnlineUser(req.body.id,req.body.phone,(info,data) => callback(info,data,res));
}