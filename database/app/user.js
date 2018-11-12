const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:  {
    type: String,
    require: true  
  },
  email :  {
    type: String
  },
  countryCode: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  requestId: {
    type: String
  },
  password:  {
    type: String,
    require: true
  },
  money:  {
    type: Number,
    default: false
  },
  status:  {
    type: Number,
    default: 1
  },
},{collection: 'user'});

const User =  mongoose.model('user',UserSchema);
module.exports = User;