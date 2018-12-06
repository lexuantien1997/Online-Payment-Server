const firebase = require("../../../../configs/firebase.config");
const { hashPassword } = require("../utils/password.crypt");
const { UPDATE_USER_DATA_ERROR, UPDATE_USER_DATA_SUCCESS } = require("../cbInstance");

const updateUserData = (securityPass,  uid, callback) => {
  let userRef = firebase.getDatabase().ref("user/" + uid);
  userRef.update({ securityPass, isFirstTime: false }, error => {
    if(error) callback(UPDATE_USER_DATA_ERROR,error)
    else callback(UPDATE_USER_DATA_SUCCESS);
  });
}


const updatePinUser = (id,securityPass,callback) => {
  securityPass = hashPassword(securityPass);
  updateUserData(securityPass,id, callback);
}


module.exports = { updatePinUser }