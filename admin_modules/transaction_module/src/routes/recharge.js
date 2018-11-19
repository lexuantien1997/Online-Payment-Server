const express = require('express');
const router = express.Router();

//const transaction = require('transaction_module');
router.post("/", (req, res) => {
    const result={
        status:0,
        money:0
    }
    var { phone ,money} = req.body;
    result.status=1;
    result.money=money;
    res.status(200).json(result);
});

// Config express route in ver 4.x
module.exports = router;