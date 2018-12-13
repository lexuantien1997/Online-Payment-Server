const express = require('express');
const router = express.Router();
const Transaction = require('../../../../database/admin/transaction');
const firebase = require("../../../../configs/firebase.config");
const checkPromotion = require('./promotion');
const {sendMessage,getRegisterToken} =require('../../../../app_modules/client_modules/src/controllers/cloudMessaging.controller')
//const transaction = require('transaction_module');
router.post("/", (req, res) => {
    let tranID = "TRANS";
    var { Name, Target, Money, Description, Phone,TargetName } = req.body;
    console.log(req.body);
    let user = firebase.getDatabase().ref("user");
    user.orderByChild("phone").equalTo(Phone).once("value", data => {
        let val = data.val();
        if (val) {
            let uid = Object.keys(val)[0];
            val = val[uid];
            if ((parseFloat(val["money"]) - parseFloat(Money) - 20000) > 0) {
                checkPromotion(val, Money,1).then(promotionVar => {
                    if (Name == undefined || Target == undefined || Money == undefined || Description == undefined)
                        res.send("Something wrong:\n"
                            + ((Name == undefined) ? "Name: undefined" : ("Name: " + Name)) + "\n"
                            + ((Target == undefined) ? "Target: undefined" : ("Target: " + Target)) + "\n"
                            + ((Money == undefined) ? "Money: undefined" : ("Money: " + Money)) + "\n"
                            + ((Description == undefined) ? "Description: undefined" : ("Description: " + Description)) + "\n"
                            //+((DateGet==undefined)?"DateGet: undefined":("DateGet: "+DateGet))+"\n"
                        );
                    else {
                        let transaction = firebase.getDatabase().ref().child("transaction");
                        transaction.push({
                            Name: TargetName,
                            Phone: Phone,
                            TranID: tranID,
                            Target: Target,
                            Money: Money,
                            Description: Description,
                            DateTrans: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
                            Type: 1,
                            FeeTrans: promotionVar["fee"],
                            MoneyPromotion: promotionVar["moneypromotion"]
                        }, error => {
                            console.log(error);
                        }).then((snap) => {
                          
                            let result = {
                                Name: Name,
                                Phone: Phone,
                                TranID: snap.key,
                                Target: Target,
                                Money: Money,
                                Description: Description,
                                DateTrans: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
                                Type: 1,
                                FeeTrans: promotionVar["fee"],
                                MoneyPromotion: promotionVar["moneypromotion"]
                            };
                            console.log("_________________________________")
                            console.log("New transaction is created: " + JSON.stringify(result));

                            // update user
                            let userRef = firebase.getDatabase().ref("user/" + uid);
                            userRef.update({ money: (parseFloat(val["money"]) - parseFloat(Money)-parseFloat(promotionVar["fee"])) }, error => {
                                if (error) {
                                    res.status(403).json(error);
                                }
                                else {
                                    user.orderByChild("phone").equalTo(Target).once("value", dataT => {
                                       
                                        let valT = dataT.val();
                                        if (valT) {
                                            let uidT = Object.keys(valT)[0];
                                            valT = valT[uidT];
                                            let userRefT = firebase.getDatabase().ref("user/" + uidT);
                                            let newmoney = parseFloat(promotionVar["money"]) + parseFloat(valT["money"]);                                           

                                            transaction.push({
                                                Name: Name,
                                                Phone: Target,
                                                TranID: tranID,
                                                Target: Phone,
                                                Money: parseFloat(promotionVar["money"]),
                                                Description: Description,
                                                DateTrans: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
                                                Type: 4,
                                                FeeTrans: promotionVar["fee"],
                                                MoneyPromotion: promotionVar["moneypromotion"]
                                            }, error => {
                                                console.log(error);
                                            }).then((snap) => {
                                                firebase.getDatabase().ref("register-token/" + uidT).orderByChild("token").once("value", snapshot => {
                                                }, errorObject => {
                                                  console.log("The read failed: " + errorObject.code);
                                                }).then((snap)=>{
                                                    sendMessage(snap.val().token,{
                                                        tranID:"dfdfdfdf",
                                                        money: "123456",
                                                        value:"Bạn đã nhận được tiền",
                                                        description: "llllllll",
                                                        type: "RECEIVE_TRANSACTION"
                                                        });
                                                    });      
                                            });
                
                                            userRefT.update({ money: newmoney }, error => {
                                                if (error) {
                                                    res.status(403).json(error);
                                                }
                                                else {
                                                    let result = {
                                                        status: 0,
                                                        money: Money,
                                                        DateTrans: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
                                                        Target: valT["name"],
                                                        TranID: snap.key.substring(3),
                                                        Fee: promotionVar["fee"],
                                                        MoneyPromotion: promotionVar["moneypromotion"]
                                                    }
                                                    result.status = 1;
                                                    result.money = Money;
                                                    console.log("_________________________________")
                                                    console.log("Transfer User; " + JSON.stringify(result));

                                                    res.status(200).json(result);
                                                }
                                            });
                                        }
                                        else {
                                            const result = {
                                                // nguoi nhan khong ton tai
                                                status: -2,
                                                DateTrans: new Date(),
                                                TranID: "00000"
                                            }
                                            console.log("ERROR: " + JSON.stringify(result));
                                            res.status(403).json(result);
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            }
            else {
                const result = {
                    // khong du so du
                    status: -1,
                    DateTrans: new Date(),
                    TranID: "00000"
                }
                console.log("ERROR: " + JSON.stringify(result));
                res.status(403).json(result);
            }
        }
        else {
            const result = {
                // error network
                status: 0,
                DateTrans: new Date(),
                TranID: "00000"
            }
            console.log("ERROR: " + JSON.stringify(result));
            res.status(403).json(result);
        }
    });

});

// Config express route in ver 4.x
module.exports = router;