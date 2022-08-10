const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  lineItems: [
    {
      productName: {
        type: String,
      },
      totalPax: {
        type: Number,
      },
      totalPrice: {
        type: Number,
      },
      travelDate: {
        type: Date,
      },
      productImg: {
        type: String,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
