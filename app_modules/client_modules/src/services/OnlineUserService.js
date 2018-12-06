const firebase = require("../../../../configs/firebase.config");
const { UPDATE_USER_ONLINE_SUCCESS, UPDATE_USER_ONLINE_ERROR, REMOVE_USER_ONLINE_ERROR, REMOVE_USER_ONLINE_SUCCESS } = require("../cbInstance");

const AddOnlineUser = (uid, phone,callback) => {
  let userRef = firebase.getDatabase().ref("online/" + uid);
  userRef.update({ phone }, error => {
    if(error) callback(UPDATE_USER_ONLINE_ERROR,error)
    else callback(UPDATE_USER_ONLINE_SUCCESS);
  });
} 

const RemoveOnlineUser = (uid,callback) => {
  let userRef = firebase.getDatabase().ref("online/" + uid);
  userRef.remove( error => {
    if(error) callback(REMOVE_USER_ONLINE_ERROR,error)
    else callback(REMOVE_USER_ONLINE_SUCCESS);
  });
} 

module.exports = {
  AddOnlineUser,
  RemoveOnlineUser
}