const express = require('express');
const router = express.Router();
const User = require('../../../../database/app/user');
const firebase = require("../../../../configs/firebase.config");

//const transaction = require('transaction_module');
router.get("/user/:key", (req, res) => {
    var key  = req.params.key;
    var result = {
        listUser: []
    }
    var ref = firebase.getDatabase().ref("user");

    ref.orderByChild("phone").once("value", function (snapshot) {
        data=[]
        snapshot.forEach(function (childSnapshot) {
            // var childData = childSnapshot.val();
            // var id=childData.id;
            var re = new RegExp("(.*"+key+".*)$");
            if(re.test(childSnapshot.val()["phone"].substring(3)))
                data.push({
                            name: childSnapshot.val()["name"],
                            phone:childSnapshot.val()["phone"],
                            avatar: childSnapshot.val()["avatar"]});
        });
        res.json(data);
    });
});

router.get("/loadTransaction/:phone", (req, res) => {
    var phone  = req.params.phone;
    var ref = firebase.getDatabase().ref("transaction");
    ref.orderByChild("Phone").equalTo(phone).once("value", function (snapshot) {
        data=[]
        snapshot.forEach(function (childSnapshot) {
            data.push(childSnapshot.val())
        });
        res.json(data);
    });
    // http://localhost:8080/transaction/search/loadTransaction/+84932311434
});

// Config express route in ver 4.x
module.exports = router;