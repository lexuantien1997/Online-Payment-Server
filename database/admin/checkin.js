const mongoose = require('mongoose');

const CheckinSchema = new mongoose.Schema({
	    phone: String,
		gmail : String,
		date: String,
		type: Number
	});
	
const Checkin =  mongoose.model('checkin',CheckinSchema);

module.exports = Checkin;