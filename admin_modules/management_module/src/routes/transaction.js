const express = require('express');
const router = express.Router();

const Transaction = require('../../../../database/admin/transaction');

router.get("/listTransaction", (req, res) => {
    Transaction.find({}, function(err, trans) {
        res.json(trans); 
    });
});

// Config express route in ver 4.x
module.exports = router;