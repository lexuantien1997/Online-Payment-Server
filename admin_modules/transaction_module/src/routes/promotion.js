const express = require('express');
const router = express.Router();
const User = require('../../../../database/app/user');

//const transaction = require('transaction_module');
router.post("/", (req, res) => {
    var { key } = req.body;
    var result = {
        listUser: []
    }
    // console.log(User.find({phone: { $regex: '.*' + key + '.*' } }).limit(5)) ;
    User.find({ phone: { $regex: '.*' + key.toString() + '.*' } }).exec(function (err, users) {
        for(var i=0; i < users.length; i++){
            result.listUser.push({
                name: users[i].name,
                phone:users[i].phone,
                avatar: users[i].avatar});
          }
        console.log(users);
        res.status(200).json(result);
    });
  
});

// Config express route in ver 4.x
module.exports = router;