const express = require('express');
const router = express.Router();

const Transaction = require('../../../../database/admin/transaction');
const firebase = require("../../../../configs/firebase.config");

router.get("/listTransaction", (req, res) => {
    var ref = firebase.getDatabase().ref("transaction");

    ref.once("value", function (snapshot) {
        data=[];
        snapshot.forEach(function (childSnapshot) {
            // var childData = childSnapshot.val();
            // var id=childData.id;
            var temp=childSnapshot.val();
            temp.TranID=childSnapshot.key.substring(3);
            data.push(temp);
        });
        res.json(data);
    });
});

// Config express route in ver 4.x
module.exports = router;