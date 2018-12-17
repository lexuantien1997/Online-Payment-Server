const firebase = require("firebase-admin");

module.exports = (req,res) => {
  let { uid } = req.body;
  console.log(uid);
  let userNotification = firebase.database().ref("notification/" + uid);
  userNotification.once("value", (snapshot) => {
    let data = [];
    snapshot.forEach(childSnapshot => {
      let subdata = childSnapshot.val();
      if(subdata.onSend == false) {
        console.log(subdata);
      }      
      // data.push(childSnapshot.val());
    });
    // console.log(data);

    res.status(200).send({a:1});
  });
}