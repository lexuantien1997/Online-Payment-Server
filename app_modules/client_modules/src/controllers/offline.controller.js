

function callback(info, data, res) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  res.status(200).json({success: 0});
}
const { RemoveOnlineTempUser } = require('../services/OnlineUserService');

module.exports = (req,res) => {
  RemoveOnlineTempUser(req.body.id,(info,data) => callback(info,data,res));
}

