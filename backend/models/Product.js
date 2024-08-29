const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  flag: Number,
  category:String,
  image: String,
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
