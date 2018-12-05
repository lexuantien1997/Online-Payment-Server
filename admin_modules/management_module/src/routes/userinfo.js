const express = require('express');
const router = express.Router();
const firebase = require("../../../../configs/firebase.config");

//const transaction = require('transaction_module');
const UserInfo = require('../../../../database/app/user');
router.post("/changestatus", (req, res) => {
    var { email ,newStatus} = req.body;
    UserInfo.updateOne({email:email},{
        $set: { 
        status: newStatus
        }
    },function(err, users) {
        res.json("sucessful"); 
    });

});
router.get("/listuserinfo", (req, res) => {
    var ref = firebase.getDatabase().ref("user");

    ref.on("value", function (snapshot) {
        data=[]
        snapshot.forEach(function (childSnapshot) {
            // var childData = childSnapshot.val();
            // var id=childData.id;
            
            data.push(childSnapshot.val());
        });
        console.log(data);
        res.json(data);
    });
});

// Config express route in ver 4.x
module.exports = router;