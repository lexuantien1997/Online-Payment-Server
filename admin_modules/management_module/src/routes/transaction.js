const express = require('express');
const router = express.Router();

const Transaction = require('../../../../database/admin/transaction');
const firebase = require("../../../../configs/firebase.config");

router.get("/listTransaction", (req, res) => {
    var ref = firebase.getDatabase().ref("transacion");

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