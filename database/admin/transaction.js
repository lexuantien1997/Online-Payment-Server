const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
        Name: String,
        TranID: String,
        Target: String,
        Money: Number,
        Description: String,
        DateTrans: String,
        Type: Number,
        FeeTrans: Number
	});
	
const Transaction =  mongoose.model('transaction',TransactionSchema);

module.exports = Transaction;