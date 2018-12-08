const firebase = require("../../../../configs/firebase.config");
const { UPDATE_USER_ONLINE_SUCCESS, UPDATE_USER_ONLINE_ERROR, REMOVE_USER_ONLINE_ERROR, REMOVE_USER_ONLINE_SUCCESS } = require("../cbInstance");

const AddOnlineUser = (uid,emailOrPhone,deviceInfo,callback) => {
  let userRef = firebase.getDatabase().ref("online/" + uid);
  userRef.update({ deviceInfo,emailOrPhone }, error => {
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


const RemoveOnlineTempUser = (uid,callback) => {
  let userRef = firebase.getDatabase().ref("online-temp/" + uid);
  userRef.remove( error => {
    if(error) callback(REMOVE_USER_ONLINE_ERROR,error)
    else callback(REMOVE_USER_ONLINE_SUCCESS);
  });
} 

const AddOnlineTempUser = (uid,phone,callback) => {
  let userRef = firebase.getDatabase().ref("online-temp/" + uid);
  userRef.update({phone }, error => {
    if(error) callback(UPDATE_USER_ONLINE_ERROR,error)
    else callback(UPDATE_USER_ONLINE_SUCCESS);
  });
} 

const checkUSerOnline = (emailOrPhone) => new Promise((resolve,reject) => {
  let onlineRef = firebase.getDatabase().ref("online");
  onlineRef
    .orderByChild("emailOrPhone")
    .equalTo(emailOrPhone)
    .once("value", (data) => resolve(data.val()));
})

module.exports = {
  AddOnlineUser,
  RemoveOnlineUser,
  checkUSerOnline,
  AddOnlineTempUser,
  RemoveOnlineTempUser
}