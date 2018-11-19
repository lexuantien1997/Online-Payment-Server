const User = require('../../../../database/app/user');

function getUserId(id) {
  return User.findById(id).exec();
}

function updateUser(id,securityPass,cb) {
  User.updateOne({_id: id},{securityPass, isFirstTime: false}, (err,data) => {
    if(!err && data) {
      getUserId(id).then(user => cb(user)); 
    }
  });
}


module.exports = {
  getUserId,
  updateUser
}