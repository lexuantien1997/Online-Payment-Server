const firebase = require("../../../../configs/firebase.config");
const { UPDATE_USER_ONLINE_SUCCESS, UPDATE_USER_ONLINE_ERROR, REMOVE_USER_ONLINE_ERROR, REMOVE_USER_ONLINE_SUCCESS } = require("../cbInstance");

const AddOnlineUser = (uid,emailOrPhone,deviceInfo,callback) => {
  let userRef = firebase.getDatabase().ref("online/" + uid);
  userRef.update({ deviceInfo,emailOrPhone }, error => {
    if(error) callback(UPDATE_USER_ONLINE_ERROR,error)
    else callback(UPDATE_USER_ONLINE_SUCCESS);
  });
} 

const RemoveTokenUser = (uid,callback) => new Promise((resolve,reject) => {
  let userRef = firebase.getDatabase().ref("register-token/" + uid);
  userRef.remove( error => {
    if(error) callback("REMOVE_USER_TOKEN_ERROR",error)
    else {
      callback("REMOVE_USER_TOKEN_SUCCESS");
      resolve();
    }
  });
}) 

const RemoveOnlineUser = (uid,callback) => new Promise((resolve,reject) => {
  let userRef = firebase.getDatabase().ref("online/" + uid);
  userRef.remove( error => {
    if(error) callback(REMOVE_USER_ONLINE_ERROR,error)
    else {
      callback(REMOVE_USER_ONLINE_SUCCESS);
      RemoveTokenUser(uid,callback).then(()=>resolve());   
    }
  });
}) 

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

const blockUSer = (uid,callback) => {
  RemoveOnlineUser(uid,callback).then(() => {
    let userRef = firebase.getDatabase().ref("user/" + uid);
    userRef.update({ type: 1 }, error => {
      if(error) callback("BLOCK_FAIL",error)
      else callback("BLOCK_SUCCESS");
    });
  })
}

const unBlockUSer = (uid,callback) => {
  let userRef = firebase.getDatabase().ref("user/" + uid);
  userRef.update({ type: 0 }, error => {
    if(error) callback("UNBLOCK_FAIL",error)
    else callback("UNBLOCK_SUCCESS");
  });
}

module.exports = {
  AddOnlineUser,
  RemoveOnlineUser,
  checkUSerOnline,
  blockUSer,
  unBlockUSer
}