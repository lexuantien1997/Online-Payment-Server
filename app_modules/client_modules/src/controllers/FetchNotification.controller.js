const firebase = require("firebase-admin");
const { sendNotificationAfterAuthen } = require("./cloudMessaging.controller");
module.exports = (req,res) => {
  let { uid } = req.body;
  let userNotification = firebase.database().ref("notification/" + uid);
  userNotification.once("value", (userNotiSnapshot) => {
    firebase.database().ref("register-token/" + uid).orderByChild("token").once("value", snapshot => { }, errorObject => console.log("The read failed: " + errorObject.code))
    .then((snapToken)=> { 
      let token = snapToken.val().token;
      userNotiSnapshot.forEach(notiItem => {
        console.log(notiItem.key);
        if(notiItem.val().onSend == false) {
          let { title, data, body }= notiItem.val();
          sendNotificationAfterAuthen(token,title,body,data).then(()=> { // success
            firebase.database().ref("notification/" + uid + "/" + notiItem.key).update({ onSend: true });
          }).catch(()=>{ // error
            firebase.database().ref("notification/" + uid + "/" + notiItem.key).update({ onSend: true });
          });
        }
      });
    });
    res.status(200).send({status:0});
  });
};