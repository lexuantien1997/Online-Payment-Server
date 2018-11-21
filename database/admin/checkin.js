const mongoose = require('mongoose');

const CheckinSchema = new mongoose.Schema({
		emailOrPhone: String,
		date: String,
		type: String
	});
	
const Checkin =  mongoose.model('checkin',CheckinSchema);

module.exports = Checkin;