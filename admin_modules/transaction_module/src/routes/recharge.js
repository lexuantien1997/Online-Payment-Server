const express = require('express');
const router = express.Router();
const User = require('../../../../database/app/user');
const axios = require('axios');
const Transaction = require('../../../../database/admin/transaction');

router.post("/", (req, res) => {
    // Save transaction
    let tranID = "TRANS0001";
    var { phone,money } = req.body;
    if (phone == undefined || money == undefined )
        res.send("Something wrong:\n"
            + ((phone == undefined) ? "Name: undefined" : ("Name: " + phone)) + "\n"
            + ((money == undefined) ? "Money: undefined" : ("Money: " + money))
        );
    else {
        const newTransaction = new Transaction({
            Name: phone,
            Phone: phone,
            TranID: tranID,
            Target: phone,
            Money: money,
            Description: "nothing",
            DateTrans: new Date(),
            Type: 3,
            FeeTrans: 0
        });
        newTransaction.save().then(item =>
            console.log("saved")
        ).catch(err => {
            console.log(err);
        });
    }


    // Handle transaction for clients

    let user = User.find({ phone: phone });
    let newMoney = user.money + parseInt(money, 10);

    User.findOneAndUpdate({ phone: phone },
        { $set: { money: newMoney } }, { new: true }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }

            console.log(doc);
        });
    //SSE
    axios.post('http://localhost:8080/sendMessage', {
        name: phone,
        type: "1",
        money: money
    })
        .then(function (response) {
            console.log("sucess");
        })
        .catch(function (error) {
            console.log("error");
        });

    // response for apps
    const result = {
        status: 0,
        money: 0,
        DateTrans: new Date(),
        TranID: tranID
    }
    result.status = 1;
    result.money = money;
    res.json(result);
});

// Config express route in ver 4.x
module.exports = router;