const express = require('express');
const router = express.Router();

const Promotion = require('../../../../database/app/promotion');

router.get("/listPromotion", (req, res) => {
    Promotion.find({}, function(err, promo) {
        res.json(promo); 
    });
});

// Config express route in ver 4.x
module.exports = router;