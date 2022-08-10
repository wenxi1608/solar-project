const express = require("express");
const cart = express.Router();
const User = require("../models/userdb");
const Cart = require("../models/cartdb");

cart.get("/", async (req, res) => {
  try {
    User.findOne({ _id: req.session.userId })
      .populate("cart") // property to populate
      .then((user) => {
        res.render("cart.ejs", { itemsInCart: user.cart.lineItems });
      });
  } catch (error) {
    console.log(error);
    res.send("Failed to find cart");
  }
});

module.exports = cart;

// when you res.json(user):
// {
//   "_id": "62f332a7376a4a18c4a48cf8",
//   "firstname": "Wen",
//   "lastname": "He",
//   "email": "wenxi.cart@gmail.com",
//   "password": "$2b$10$0dzX.W71jP.S8ORemxUXNudiJmR6P54wsw7aQmJevM2mNlot05UnK",
//   "cart": {
//   "_id": "62f332a7376a4a18c4a48cf6",
//   "lineItems": [
//   {
//   "productName": "Saturn",
//   "totalPax": 4,
//   "totalPrice": 4000,
//   "travelDate": "2022-08-17T00:00:00.000Z",
//   "_id": "62f332fd376a4a18c4a48cff"
//   },
//   {
//   "productName": "Saturn",
//   "totalPax": 2,
//   "totalPrice": 2000,
//   "travelDate": "2022-08-11T00:00:00.000Z",
//   "_id": "62f347d1376a4a18c4a48d08"
//   },
//   {
//   "productName": "Saturn",
//   "totalPax": 2,
//   "totalPrice": 2000,
//   "travelDate": "2022-08-25T00:00:00.000Z",
//   "_id": "62f34894d478f787fcc25c85"
//   },
//   {
//   "productName": "Saturn",
//   "totalPax": 5,
//   "totalPrice": 5000,
//   "travelDate": "2022-08-11T00:00:00.000Z",
//   "_id": "62f34cd7cd902493ff0e71d5"
//   },
//   {
//   "productName": "Venus",
//   "totalPax": 5,
//   "totalPrice": 5000,
//   "travelDate": "2022-08-12T00:00:00.000Z",
//   "_id": "62f34fa3097412290119792e"
//   }
//   ],
//   "__v": 0
//   },
//   "__v": 0
//   }
