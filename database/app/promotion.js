const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
        ID_PRMOTION: String,
        Start_date: String,
        End_date: String,
        Image: String,
        Description: String,
        Query:String,
        Type_Transaction: Number,
        Discount:String
	},{ collection: 'promotion'});

const Promotion =  mongoose.model('promotion',PromotionSchema);

module.exports = Promotion;