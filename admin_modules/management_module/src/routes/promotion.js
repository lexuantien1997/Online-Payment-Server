const express = require('express');
const router = express.Router();

var cloudinary = require('cloudinary');
const Promotion = require('../../../../database/app/promotion');

router.get("/listPromotion", (req, res) => {
    Promotion.find({}, function(err, promo) {
        res.json(promo); 
    });
});
router.post("/init", (req, res) => {
    cloudinary.config({ 
        cloud_name: 'dzzyu5ejs', 
        api_key: '216155983937352', 
        api_secret: '1FVnzePNIADCljJ0_Q5VamCzM64' 
      });
    var promotion =req.body.promotion;
    var base64Data = promotion.imagePreviewUrl.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
      console.log(err);
    });
    cloudinary.v2.uploader.upload('out.png', {public_id: "sample_id"}, 

    function(error, result){console.log(result, error)});

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
        ID_PRMOTION: "1",
        Start_date: promotion.beginTime+" "+promotion.beginDate,
        End_date: promotion.endTime+" "+promotion.endDate,
        Image: String,
        Description: promotion.description,
        Query:query,
        Type_Transaction: promotion.transaction
    });
    res.json("123");
});
// Config express route in ver 4.x
module.exports = router;