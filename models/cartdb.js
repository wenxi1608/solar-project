const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Declare the user property as a mongoose ObjectId
    ref: "User",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  totalPax: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  travelDate: {
    type: Date,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
