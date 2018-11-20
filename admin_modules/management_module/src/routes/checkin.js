const express = require('express');
const router = express.Router();

const Checkin = require('../../../../database/admin/checkin');

router.get("/listCheckin", (req, res) => {
    Checkin.find({}, function(err, checkin) {
        res.json(checkin); 
    });
});

// Config express route in ver 4.x
module.exports = router;