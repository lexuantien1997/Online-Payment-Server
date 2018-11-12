const express = require('express');
const router = express.Router();

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
    UserInfo.find({}, function(err, users) {
        res.json(users); 
    });
});

// Config express route in ver 4.x
module.exports = router;