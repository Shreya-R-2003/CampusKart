const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  username: String,
  productname:String,
  description: String,
  requesttype:String,
  category:String,
});

const Request = mongoose.model('Request', RequestSchema);
module.exports = Request;
