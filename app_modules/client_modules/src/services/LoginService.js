const firebase = require("../../../../configs/firebase.config");

const checkPhoneExist = (phone) => new Promise((resolve,reject) => {
  let userRef = firebase.getDatabase().ref().child("user");
  userRef
    .orderByChild("phone")
    .equalTo(phone)
    .once("value", (data) => resolve(data.val()));
})

const checkEmailExist = (email) => new Promise((resolve,reject) => {
  userRef
    .orderByChild("email")
    .equalTo(email)
    .once("value", (data) => resolve(data.val()));
})

module.exports = {
  checkPhoneExist,
  checkEmailExist
}