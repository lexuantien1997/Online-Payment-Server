const express = require('express');
const router = express.Router();

var cloudinary = require('cloudinary');
const Promotion = require('../../../../database/app/promotion');
const fs = require('fs');
router.get("/listPromotion", (req, res) => {
    Promotion.find({}, function(err, promo) {
        res.json(promo); 
    });
});

var promise1 =(idName)=> new Promise(function(resolve, reject) {
    cloudinary.v2.uploader.upload('out.png', {public_id: idName}, 
    function(error, result){
        if(result!=null)
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
    var promotion =req.body.promotion;
    var base64Data = promotion.imagePreviewUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
    console.log(err);
    });
    let imageLink="null";
    let idPrmotion="Promotion";
    Promotion.countDocuments ({}).exec().then(count => {
        idPrmotion=idPrmotion+count;
        promise1(idPrmotion).then(function(value) {
            console.log(typeof(value.url));
            imageLink=value.url;
            require("fs").unlinkSync("out.png")
            var value="";
            if (promotion.promotionCon)
                value="{age}";
            else
                value="{registedday}"
            var firstCon="";
            if(promotion.query2!=""){
                firstCon=promotion.query1+" "+promotion.query2
            }
            var secondCon="";
            if(promotion.query3!=""){
                secondCon=promotion.query3+" "+promotion.query4
            }
            query=firstCon+" "+value+" "+secondCon;
            const newPromotion = new Promotion({
                ID_PRMOTION: idPrmotion,
                Start_date: promotion.beginTime+" "+promotion.beginDate,
                End_date: promotion.endTime+" "+promotion.endDate,
                Image: imageLink,
                Description: promotion.description,
                Query:query,
                Type_Transaction: promotion.transaction,
                Discount:promotion.discount
            });
            newPromotion.save().then(item =>
                res.json("123")
            ).catch(err => {
                console.log(err);
            });
        });
    });
});
// Config express route in ver 4.x
module.exports = router;