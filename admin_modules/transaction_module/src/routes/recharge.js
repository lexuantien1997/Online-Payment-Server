const express = require('express');
const router = express.Router();
const User = require('../../../../database/app/user');
const axios = require('axios');
const firebase = require("../../../../configs/firebase.config");
const checkPromotion =require('./promotion');
router.post("/", (req, res) => {
    // Save transaction
    let tranID = "TRANS";
    var { phone, money, name } = req.body;
    let user = firebase.getDatabase().ref("user");
    user.orderByChild("phone").equalTo(phone).once("value", data => {
        let val = data.val();
        if (val) {
            let uid = Object.keys(val)[0];
            val = val[uid];
            checkPromotion(val, money,3).then(promotionVar => {
                // Save transaction   
                if (phone == undefined || money == undefined)
                    res.send("Something wrong:\n"
                        + ((phone == undefined) ? "Name: undefined" : ("Name: " + phone)) + "\n"
                        + ((money == undefined) ? "Money: undefined" : ("Money: " + money))
                    );
                else {
                    let transaction = firebase.getDatabase().ref().child("transaction");
                    transaction.push({
                        Name: name,
                        Phone: phone,
                        TranID: tranID,
                        Target: phone,
                        Money:  parseFloat(money),
                        Description: "nothing",
                        DateTrans: (new Date()).toLocaleDateString()+" "+(new Date()).toLocaleTimeString(),
                        Type: 3,
                        FeeTrans: promotionVar["fee"],
                        MoneyPromotion: promotionVar["moneypromotion"]
                    }, error => {
                        if (error)
                            console.log(error);

                    }).then((snap) => {
                        let result = {
                            Name: name,
                            Phone: phone,
                            TranID: snap.key,
                            Target: phone,
                            Money: money,
                            Description: "nothing",
                            DateTrans: (new Date()).toLocaleDateString()+" "+(new Date()).toLocaleTimeString(),
                            Type: 3,
                            FeeTrans: promotionVar["fee"],
                            MoneyPromotion: promotionVar["moneypromotion"]
                        };
                        console.log("_________________________________")
                        console.log("New transaction is created: " + JSON.stringify(result));
                        moneynew = parseFloat(promotionVar["money"]);
                        // update money user
                        let userRef = firebase.getDatabase().ref("user/" + uid);
                        userRef.update({ money:moneynew }, error => {
                            if (error) {
                                res.status(403).json(error);
                            }
                            else {
                                let result = {
                                    status: 0,
                                    money: money,
                                    DateTrans: (new Date()).toLocaleDateString()+" "+(new Date()).toLocaleTimeString(),
                                    TranID: snap.key.substring(3),
                                    Fee:promotionVar["fee"],
                                    MoneyPromotion: promotionVar["moneypromotion"]
                                }
                                result.status = 1;
                                result.money = money;
                                console.log("_________________________________")
                                console.log("New recharge transaction is created; " + JSON.stringify(result));
                                res.status(200).json(result);
                            }
                        });
                    });
                }
            });
        }
        else {
            res.status(403).json(error);
        }
    });
});

// Config express route in ver 4.x
module.exports = router;