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
  } catch (error) {
    console.log(error);
    res.send("Failed to find cart");
  }
});

cart.delete("/:cartId/lineItems/:lineItemId", async (req, res) => {
  console.log("params:", req.params);

  try {
    // suffice to use req.params.cartId because we are finding a document in collection
    await Cart.findByIdAndUpdate(req.params.cartId, {
      $pull: {
        lineItems: {
          _id: mongoose.Types.ObjectId(req.params.lineItemId), // have to use mongoose.Types.ObjectId because we are searching for object Id within an element in the document, not a string
        },
      },
    });
    res.redirect("/cart");
  } catch (error) {
    res.status(400).send("Failed to delete from cart");
  }
});

module.exports = cart;

// const user = {
//   _id: "62f332a7376a4a18c4a48cf8",
//   firstname: "Wen",
//   lastname: "He",
//   email: "wenxi.cart@gmail.com",
//   password: "$2b$10$0dzX.W71jP.S8ORemxUXNudiJmR6P54wsw7aQmJevM2mNlot05UnK",
//   cart: {
//     _id: "62f332a7376a4a18c4a48cf6",
//     lineItems: [
//       {
//         productName: "Saturn",
//         totalPax: 4,
//         totalPrice: 4000,
//         travelDate: "2022-08-17T00:00:00.000Z",
//         _id: "62f332fd376a4a18c4a48cff",
//       },
//       {
//         productName: "Saturn",
//         totalPax: 2,
//         totalPrice: 2000,
//         travelDate: "2022-08-11T00:00:00.000Z",
//         _id: "62f347d1376a4a18c4a48d08",
//       },
//       {
//         productName: "Saturn",
//         totalPax: 2,
//         totalPrice: 2000,
//         travelDate: "2022-08-25T00:00:00.000Z",
//         _id: "62f34894d478f787fcc25c85",
//       },
//       {
//         productName: "Saturn",
//         totalPax: 5,
//         totalPrice: 5000,
//         travelDate: "2022-08-11T00:00:00.000Z",
//         _id: "62f34cd7cd902493ff0e71d5",
//       },
//       {
//         productName: "Venus",
//         totalPax: 5,
//         totalPrice: 5000,
//         travelDate: "2022-08-12T00:00:00.000Z",
//         _id: "62f34fa3097412290119792e",
//       },
//       {
//         productName: "Mars",
//         totalPax: 5,
//         totalPrice: 5000,
//         travelDate: "2022-09-01T00:00:00.000Z",
//         _id: "62f352a3ffe182b45c9f9bc1",
//       },
//       {
//         productName: "Saturn",
//         totalPax: 5,
//         totalPrice: 5000,
//         travelDate: "2022-09-01T00:00:00.000Z",
//         _id: "62f35632c59c313c01c5deda",
//       },
//       {
//         productName: "Neptune",
//         totalPax: 5,
//         totalPrice: 5000,
//         travelDate: "2022-08-26T00:00:00.000Z",
//         productImg:
//           "https://images-assets.nasa.gov/image/8910708/8910708~thumb.jpg",
//         _id: "62f3599ade0058d0e221b19d",
//       },
//       {
//         productName: "Saturn",
//         totalPax: 3,
//         totalPrice: 3000,
//         travelDate: "2022-08-18T00:00:00.000Z",
//         productImg:
//           "https://images-assets.nasa.gov/image/PIA21047/PIA21047~thumb.jpg",
//         _id: "62f359fa34bff18775998f97",
//       },
//       {
//         productName: "Saturn",
//         totalPax: 2,
//         totalPrice: 2000,
//         travelDate: "2022-09-08T00:00:00.000Z",
//         productImg:
//           "https://images-assets.nasa.gov/image/PIA21047/PIA21047~thumb.jpg",
//         _id: "62f39d33d6a67069cc92d8ea",
//       },
//       {
//         productName: "Saturn",
//         totalPax: 5,
//         totalPrice: 5000,
//         travelDate: "2022-09-08T00:00:00.000Z",
//         productImg:
//           "https://images-assets.nasa.gov/image/PIA21047/PIA21047~thumb.jpg",
//         _id: "62f3ae0c66c26486427b0f20",
//       },
//     ],
//     __v: 0,
//   },
//   __v: 0,
// };
