const firebase = require("../../../../configs/firebase.config");

const checkPromotion = (val,money)  => new Promise((resolve,reject) =>  { 
   
    firebase.getDatabase().ref("variableRule/recharge").once("value", snapshot => {
        let fee=0;
        snapshot.forEach(function (childSnapshot) {
            // fee=childSnapshot.val()["fee"];
            if(childSnapshot.key=="fee"){
                fee=childSnapshot.val()
            }
        });
        var orginDate = new Date().getTime() / 1000;
        firebase.getDatabase().ref("promotion").orderByChild("Start_date").endAt(orginDate)
        .once("value", snapshot => {
            snapshot.forEach(function (childSnapshot) {
                let valPro=childSnapshot.val();
                if(orginDate<parseFloat(valPro["End_date"])){
                    let birthday=parseFloat(val["birthday"]);
                    var date = new Date(birthday);
                    let age=(new Date()).getFullYear()-date.getFullYear()
                    query=valPro["Query"].replace("{age}",age);
                    query=query.split(" ");
                    money=parseFloat(val["money"])+parseFloat(money)-parseFloat(fee);
                    let isOk=true;
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
                        money=parseFloat(money)+parseFloat(valPro["Discount"]);
                        resolve( {
                            is:true,
                            money:money,
                            moneypromotion:valPro["Discount"],
                            fee:fee
                        });
                    }
                    resolve( {
                        is:false,
                        money:money,
                        moneypromotion:0,
                        fee:fee
                    });
                    
                }
            });
        });
    });

});
module.exports =checkPromotion;