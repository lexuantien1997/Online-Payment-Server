const express = require('express');
const router = express.Router();

//const transaction = require('transaction_module');
router.post("/", (req, res) => {
    let tranID="TRANS0001";
    var { Name, Target, Money, Description } = req.body;
    if (Name == undefined || Target == undefined || Money == undefined || Description == undefined)
        res.send("Something wrong:\n"
            + ((Name == undefined) ? "Name: undefined" : ("Name: " + Name)) + "\n"
            + ((Target == undefined) ? "Target: undefined" : ("Target: " + Target)) + "\n"
            + ((Money == undefined) ? "Money: undefined" : ("Money: " + Money)) + "\n"
            + ((Description == undefined) ? "Description: undefined" : ("Description: " + Description)) + "\n"
            //+((DateGet==undefined)?"DateGet: undefined":("DateGet: "+DateGet))+"\n"
        );
    else {
        const newTransaction = new Transaction({
            Name: Name,
            TranID:tranID,
            Target: Target,
            Money: Money,
            Description: Description,
            DateTrans: new Date(),
            Type: 2,
            FeeTrans: 0
        });
        newTransaction.save().then(item =>
            res.json(JSON.stringify(req.body))
        ).catch(err => {
            console.log(err);
        });
    }
    const result={
        status:0,
        DateTrans: new Date(),
        TranID:tranID
    }
    var { phone ,money} = req.body;
    result.status=1;
    result.money=money;
    res.status(200).json(result);
});

// Config express route in ver 4.x
module.exports = router;