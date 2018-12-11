const { unBlockUSer } = require('../services/OnlineUserService');

function callback(info, data,res) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {       
    case "UNBLOCK_SUCCESS": 
    {
      let api = { status: 0 };
      return res.status(200).json(api);
    }
  }
}


module.exports = (req,res) => {
  unBlockUSer(req.body.id, (info,data) => callback(info,data,res));
}