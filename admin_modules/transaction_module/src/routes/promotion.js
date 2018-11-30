const express = require('express');
const router = express.Router();
const Promotion = require('../../../../database/app/promotion');

//const transaction = require('transaction_module');
router.post("/create", (req, res) => {
    var { promotion } = req.body;
    console.log(promotion);
    res.status(200).json(promotion);
  
});

// Config express route in ver 4.x
module.exports = router;