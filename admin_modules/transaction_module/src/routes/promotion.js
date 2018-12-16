const firebase = require("../../../../configs/firebase.config");

const checkPromotion = (val,money,type)  => new Promise((resolve,reject) =>  { 
   if(type==1) rule="utu";
   if(type==3) rule="recharge"
    firebase.getDatabase().ref("variableRule/"+rule).once("value", snapshot => {
        let fee=0;
        snapshot.forEach(function (childSnapshot) {
            // fee=childSnapshot.val()["fee"];
            if(childSnapshot.key=="fee"){
                fee=childSnapshot.val()
            }
        });
        
        money=parseFloat(val["money"])+parseFloat(money)-parseFloat(fee);
        var orginDate = new Date().getTime() / 1000;
        firebase.getDatabase().ref("promotion").orderByChild("Start_date").endAt(orginDate)
        .once("value", snapshot => {
            
            let length=0;
            snapshot.forEach(function (childSnapshot) {
                length++;
                let valPro=childSnapshot.val();
                if(orginDate<parseFloat(valPro["End_date"])&&type==valPro["Type_Transaction"]){
                    let birthday=parseFloat(val["birthday"]);
                    var date = new Date(birthday);
                    let age=(new Date()).getFullYear()-date.getFullYear()
                    query=valPro["Query"].replace("{age}",age);
                    query=query.split(" ");
                    let isOk=false;
                    if(query.length>3){         
                        if (query[1] == "<"){
                            isOk=eval(query[0]+"<"+query[2]);
                        }
                        else {
                            isOk=eval(query[0]+"<"+query[2]+"||"+query[0]+"=="+query[2]);
                        }
                        if (query[3] == "<"){
                            isOk=eval(query[2]+"<"+query[4]);
                        }
                        else {
                            isOk=eval(query[2]+"<"+query[4]+"||"+query[2]+"=="+query[4]);
                        }
                    }
                    else {
                        if (query[1] == "<"){
                            isOk=eval(query[0]+"<"+query[2]);
                        }
                        else {
                            isOk=(eval(query[0]+"<"+query[2]+"||"+query[0]+"=="+query[2]));
                        }
                    }
                    if(isOk){
                        console.log("1vo dayyyyyyyyyyyyyy");
                        money=parseFloat(money)+parseFloat(valPro["Discount"]);
                        resolve( {
                            is:true,
                            money:money,
                            moneypromotion:valPro["Discount"],
                            fee:fee
                        });
                    }
                    console.log("2");
                    resolve( {
                        is:false,
                        money:money,
                        moneypromotion:0,
                        fee:fee
                    });
                    
                }
                else{
                    console.log(money);
                    resolve( {
                        is:false,
                        money:money,
                        moneypromotion:0,
                        fee:fee
                    });
                }
            });
            if (length == 0) {
                money = parseFloat(val["money"]) + parseFloat(money) - parseFloat(fee);
                console.log(money);
                resolve({
                    is: false,
                    money: money,
                    moneypromotion: 0,
                    fee: fee
                });
            }
        });
    });

});
module.exports =checkPromotion;