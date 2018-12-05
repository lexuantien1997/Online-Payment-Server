const express = require('express');
const router = express.Router();

const Checkin = require('../../../../database/admin/checkin');
const firebase = require("../../../../configs/firebase.config");

router.get("/listCheckin", (req, res) => {
    var ref = firebase.getDatabase().ref("checkin");

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