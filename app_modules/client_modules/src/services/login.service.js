const User = require('../../../../database/app/user');

function checkPhone(phone) {
  return User.findOne({phone}).exec();
}

function checkEmail(email) {
  return User.findOne({email}).exec();
}

module.exports = {
  checkEmail,
  checkPhone
}