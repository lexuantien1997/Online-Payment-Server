const express = require('express');
const router = express.Router();

var cloudinary = require('cloudinary');
const Promotion = require('../../../../database/app/promotion');
const firebase = require("../../../../configs/firebase.config");
router.get("/listPromotion", (req, res) => {
    // Promotion.find({}, function (err, promo) {
    //     res.json(promo);
    // });
    var ref = firebase.getDatabase().ref("promotion");

    ref.once("value", function (snapshot) {
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

var promise1 = (idName) => new Promise(function (resolve, reject) {
    cloudinary.v2.uploader.upload('out.png', { public_id: idName },
        function (error, result) {
            if (result != null)
                resolve(result);
            else reject();
        });
});
router.post("/init", (req, res) => {
    cloudinary.config({
        cloud_name: 'dzzyu5ejs',
        api_key: '216155983937352',
        api_secret: '1FVnzePNIADCljJ0_Q5VamCzM64'
    });
    var promotion = req.body.promotion;
    var base64Data = promotion.imagePreviewUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    require("fs").writeFile("out.png", base64Data, 'base64', function (err) {
        console.log("false");
    });
    let imageLink = "null";
    let idPrmotion = "Promotion";
    promise1(idPrmotion).then(function (value) {
        console.log((value.url));
        imageLink = value.url;
        require("fs").unlinkSync("out.png")
        var value = "";
        if (promotion.promotionCon)
            value = "{age}";
        else
            value = "{registedday}"
        var firstCon = "";
        if (promotion.query2 != "") {
            firstCon = promotion.query1 + " " + promotion.query2
        }
        var secondCon = "";
        if (promotion.query3 != "") {
            secondCon = promotion.query3 + " " + promotion.query4
        }
        query = firstCon + " " + value + " " + secondCon;

        let user = firebase.getDatabase().ref().child("promotion");
        user.push({
            ID_PRMOTION: idPrmotion,
            Start_date: promotion.beginTime + " " + promotion.beginDate,
            End_date: promotion.endTime + " " + promotion.endDate,
            Image: imageLink,
            Description: promotion.description,
            Query: query,
            Type_Transaction: promotion.transaction,
            Discount: promotion.discount
        }, error => {
            console.log(error);
        });
    });
});
// Config express route in ver 4.x
module.exports = router;