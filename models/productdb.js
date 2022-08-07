const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  bodyType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  highlights: {
    type: Array,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema); //give the model name "Product" and mongoose will infer the collection name with an s and lower case

module.exports = Product;
