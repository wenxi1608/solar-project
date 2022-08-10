const express = require("express");
const destinations = express.Router();
const Product = require("../models/productdb");
const Cart = require("../models/cartdb");
const User = require("../models/userdb");
const fetch = require("node-fetch");

destinations.get("/", async (req, res) => {
  try {
    const listOfDestinations = await Product.find();
    res.render("products/index.ejs", { listOfDestinations });
  } catch (error) {
    res.send("Error");
    console.log(error);
  }
});

destinations.get("/:dest", async (req, res) => {
  try {
    async function getResponse() {
      const response = await fetch(
        "https://api.le-systeme-solaire.net/rest/bodies/"
      );
      const data = await response.json();

      const productName = req.params.dest;
      const foundProduct = await Product.findOne({ name: productName });

      data.bodies.forEach((element) => {
        if (element.englishName === `${productName}`) {
          return (
            (discoveredBy = element.discoveredBy),
            (discoveryDate = element.discoveryDate)
          );
        }
      });

      res.render("products/showproduct.ejs", {
        foundProduct,
        discoveredBy,
        discoveryDate,
      });
    }
    getResponse();
  } catch (error) {
    res.send("Destination not found");
  }
});

destinations.post("/:dest", async (req, res) => {
  const productName = req.params.dest;
  const foundProduct = await Product.findOne({ name: productName });
  const foundUser = await User.findOne({ email: req.session.user });
  console.log("Found User:", foundUser);
  console.log("Found Product:", foundProduct);
  console.log("Options:", req.body);
  console.log("User Cart ID in dest.js:", foundUser.cart);

  //Store the selected item options in cart DB
  try {
    await Cart.findByIdAndUpdate(
      // first arg is cartId of session user (i.e. identify document to update)
      foundUser.cart,
      //req.session.cartId,

      // second arg is to push the item options into lineItems which is an array of objects
      {
        $push: {
          lineItems: {
            productName: req.params.dest,
            totalPax: req.body.qty,
            totalPrice: foundProduct.price * req.body.qty,
            travelDate: req.body.date,
            productImg: foundProduct.img,
          },
        },
      }
    );

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
    res.send("Failed to add to cart");
  }
});

module.exports = destinations;
