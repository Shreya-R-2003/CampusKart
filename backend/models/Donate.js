const mongoose = require('mongoose');

const DonateSchema = new mongoose.Schema({
  itemName: String,
  description: String,
//   price: String,
//   flag: Number,
  category:String,
  image: String,
});

const Donate = mongoose.model('Donate', DonateSchema);
module.exports = Donate;