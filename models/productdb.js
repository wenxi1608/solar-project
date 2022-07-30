const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: Array,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  poiCategory: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  highlights: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema); //give the model name "Product" and mongoose will infer the collection name with an s and lower case

module.exports = Product;