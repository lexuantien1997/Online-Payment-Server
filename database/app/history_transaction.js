const mongoose = require('mongoose');

const HistoryTransactionSchema = new mongoose.Schema({
        ID_USER: String,
        Money: String,
        Description: String,
        DateGet: String
	},{ collection: 'history_transaction'});

const HistoryTransaction =  mongoose.model('history_transaction',HistoryTransactionSchema);

module.exports = HistoryTransaction;