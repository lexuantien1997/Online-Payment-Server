const firebase = require("firebase-admin");

/**
 * 
 * @param {*} registerToken : token for specific device: get token from ref("register-token/uid/token")
 * => use function `getRegisterToken` at the bottom
 * @param {*} data : need value and type
 *  + type : RECEIVE_TRANSACTION, BLOCKED, ...
 * => important: it must be String
 * example about data:
 *  {
 *    value: "lalala"  
 *    type: "RECEIVE_TRANSACTION" // BLOCKED
 *  }
 * 
 */
const sendMessage = (registerToken, data) => {
  let message = {
    data,
    token: registerToken
  }

  firebase.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}

// uid user nhận transaction hoặc uid user bị block
const getRegisterToken = (uid) => {
  firebase.database().ref("register-token/" + uid).orderByChild("token").on("value", snapshot => {
    console.log(snapshot.val());
  }, errorObject => {
    console.log("The read failed: " + errorObject.code);
  });
}



module.exports = {
  sendMessage,
  getRegisterToken
};