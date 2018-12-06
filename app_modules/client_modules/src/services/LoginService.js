const firebase = require("../../../../configs/firebase.config");

const checkPhoneExist = (phone) => new Promise((resolve,reject) => {
  let userRef = firebase.getDatabase().ref("user");
  userRef
    .orderByChild("phone")
    .equalTo(phone)
    .once("value", (data) => resolve(data.val()));
})

const checkEmailExist = (email) => new Promise((resolve,reject) => {
  let userRef = firebase.getDatabase().ref("user");
  userRef
    .orderByChild("email")
    .equalTo(phone)
    .once("value", (data) => resolve(data.val()));
})

module.exports = {
  checkPhoneExist,
  checkEmailExist
}