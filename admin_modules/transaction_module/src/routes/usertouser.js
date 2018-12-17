const express = require('express');
const router = express.Router();
const Transaction = require('../../../../database/admin/transaction');
const firebase = require("../../../../configs/firebase.config");
const checkPromotion = require('./promotion');
const {sendMessage,getRegisterToken, sendNotificationAfterAuthen} =require('../../../../app_modules/client_modules/src/controllers/cloudMessaging.controller')
//const transaction = require('transaction_module');

const addNotification = (uid, title, body, data, onSend) => new Promise((resolve, reject) => {
  let notification = firebase.getDatabase().ref("notification/" + uid);
  notification.push({
    title,
    body,
    data,
    onSend
  }, error => {
    if(error) reject(error);
  }).then(snapshot => resolve(snapshot.key));
})

const updateNotification = (uid,key,data,onSend) => {
  console.log("UPDATE",data);
  let notification = firebase.getDatabase().ref("notification/" + uid + "/" + key);
  notification.update({ onSend, data });
}

 


router.post("/", (req, res) => {
    let tranID = "TRANS";
    var { Name, Target, Money, Description, Phone,TargetName } = req.body;
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
                            Money:  parseFloat(Money),
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
                                            let newmoney=0;
                                            if(promotionVar["is"])
                                                newmoney = parseFloat(promotionVar["moneypromotion"]) + parseFloat(valT["money"]);                                           
                                            else
                                                newmoney = parseFloat(Money) + parseFloat(valT["money"]); 
                                            console.log("money123",newmoney);
                                            transaction.push({
                                                Name: Name,
                                                Phone: Target,
                                                TranID: tranID,
                                                Target: Phone,
                                                Money:  parseFloat(Money),
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
                                                  // console.log("sdfsdfsdf",snap.val().token);
                                                    if(snap.val() != null) {
                                                      // if (snap.val() != null) { // online -> send message
                                                        let data = {
                                                          money: Money.toString(),
                                                          description: Description.toString(),
                                                          type: '0' // RECEIVE_TRANSACTION
                                                        };
                                                        addNotification(uidT, Name, Description, data, true).then((key)=> {
                                                          sendNotificationAfterAuthen(snap.val().token, Name, Description, data, true).catch(()=> {
                                                            data.type = '1' // RECEIVE_TRANSACTION_NO_POPUP
                                                            console.log(data);
                                                            updateNotification(uidT,key,data,false);
                                                          })
                                                        })                                       
                                                      } else { // user offline by logout or lost internet 
                                                        // save to database -> user auto fetch when login or connect internet 
                                                        let data = {
                                                          //transID
                                                          //phone
                                                          //name
                                                          money: Money.toString(),
                                                          description: Description.toString(),
                                                          type: '1' // RECEIVE_TRANSACTION_NO_POPUP
                                                        };
                                                        addNotification(uidT, Name, Description, data,false); 
                                                      }  
                                                    })    
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