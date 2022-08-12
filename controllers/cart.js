const express = require("express");
const cart = express.Router();
const User = require("../models/userdb");
const Cart = require("../models/cartdb");
const Product = require("../models/productdb");
const mongoose = require("mongoose");

cart.get("/", async (req, res) => {
  try {
    await User.findOne({ _id: req.session.userId })
      .populate("cart") // property to populate
      .then((user) => {
        // res.json(user);
        res.render("cart.ejs", {
          itemsInCart: user.cart.lineItems,
          userName: user.firstname,
          cartId: user.cart._id,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to find cart");
  }
});

cart.delete("/:cartId/lineItems/:lineItemId", async (req, res) => {
  try {
    // suffice to use req.params.cartId because we are finding a document in collection
    await Cart.findByIdAndUpdate(req.params.cartId, {
      $pull: {
        lineItems: {
          _id: mongoose.Types.ObjectId(req.params.lineItemId), // use mongoose.Types.ObjectId because we are searching for object Id within an element in the document, not a string
        },
      },
    });
    res.redirect("/cart");
  } catch (error) {
    res.status(400).send("Failed to delete from cart");
  }
});

module.exports = cart;
