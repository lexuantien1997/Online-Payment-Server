
const { AddOnlineUser, RemoveOnlineUser } = require('../services/OnlineUserService');
const { REMOVE_USER_ONLINE_SUCCESS } = require("../cbInstance");

function callback(info, data,res) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {       
    case REMOVE_USER_ONLINE_SUCCESS: 
    {
      let api = { status: 0 };
      return res.status(200).json(api);
    }
  }
}


module.exports = (req,res) => {
  RemoveOnlineUser(req.body.id, (info,data) => callback(info,data,res));
}