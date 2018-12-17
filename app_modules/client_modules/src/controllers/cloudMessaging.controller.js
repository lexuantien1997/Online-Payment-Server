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

const sendNotificationAfterAuthen = (registerToken,title,body,data) => new Promise( (resolve,reject) => {
  firebase.messaging().sendToDevice(
    registerToken,
    {
      notification: {
        title,
        body
      }, 
      data
  }).then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
    resolve();
  })
  .catch((error) => {
    console.log('Error sending message:', error);
    reject();
  });
})

const sendTopicNotification = (topic,title,body,data) => {
  let payload = {
    notification: {
      title,
      body
    }, 
    data
  }
  firebase.messaging().sendToTopic(top,payload).then(datas => console.log(datas));
}

const sendNotification = () => {
  let payload = {
    notification: {
      title: "KONICHIWA",
      body: "LÊ XUÂN TIẾN 1997"
    }, 
    data: {
      account: "Savings",
      balance: "$1,234,567",
      action: "ALERT"
    }
  }
  firebase.messaging().sendToTopic("NOTIFICATION",payload).then(data => console.log(data));
  firebase.messaging().sendToDevice(
    "fiwaeC11DNc:APA91bHk_4gYt3vdUzK4EfbRc5eQZGpqtpn824QFJn6ajcvnIv6lDszZaufBwnXeQuRjBXmnLU1QniF-xrC0sJXqo-gr4twiFhpoQbugznYG00EBV-sNhro7not3ZJ94uEkPSwPUp3Xz",
    {
      notification: {
        title: "Hello world 69",
        body: "This is a test about notification"
      }, 
      data: {
        tranID: "696969",
        type: "RECEIVE_TRANSACTION",
        money: "$1,234,567",
        description: "LXT1997"
    }
  }).then(data => console.log(data));
//  firebase.messaging().send(payload).then(data => console.log(data));
}

// uid user nhận transaction hoặc uid user bị block
const getRegisterToken = (uid) => {
  firebase.database().ref("register-token/" + uid).orderByChild("token").once("value", snapshot => {
  }, errorObject => {
    console.log("The read failed: " + errorObject.code);
  }).then((snap)=>{
    return snap.val().token;
  });
}



module.exports = {
  sendMessage,
  getRegisterToken,
  sendNotification,
  sendNotificationAfterAuthen,
  sendTopicNotification
};