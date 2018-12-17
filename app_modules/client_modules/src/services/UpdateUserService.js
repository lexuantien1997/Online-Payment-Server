const firebase = require("../../../../configs/firebase.config");


const updateInformationUser = (dataUser) => new Promise((resolve,reject) => {
    let userRef = firebase.getDatabase().ref("user");
    userRef
      .orderByChild("phone")
      .equalTo(dataUser.phone)
      .once("child_added", (snapshot) => {
        snapshot.ref.update({
            name:  dataUser.name,
            email: dataUser.email,
            address: dataUser.address,
            birthday: dataUser.birthday,
            gender: dataUser.gender,
            // avatar: dataUser.avatar
        })
      })
      .then( ()=> {
         
        userRef
        .orderByChild("phone")
        .equalTo(dataUser.phone)
        .once("value", (snapshot) => {

            resolve(snapshot.val());
        })
      })

})


module.exports = {
    updateInformationUser
}