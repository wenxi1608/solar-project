const express = require("express");
const destinations = express.Router();
const Product = require("../models/productdb");
const Cart = require("../models/cartdb");
const User = require("../models/userdb");
const fetch = require("node-fetch");

destinations.get("/", async (req, res) => {
  try {
    const listOfDestinations = await Product.find();
    res.render("products/index.ejs", { listOfDestinations, authUser: null });
  } catch (error) {
    res.send("Error");
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

      // let discoveredBy = {};
      // let discoveryDate = {};
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
        authUser: null,
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
  const totalPax = req.body.qty;
  const travelDate = req.body.date;
  const totalPrice = foundProduct.price * totalPax;
  console.log("Session User:", foundUser);

  //Store the new cart item in DB
  try {
    await Cart.create({
      user: foundUser,
      productName,
      totalPax,
      totalPrice,
      travelDate,
    });
    res.send("added item to cart");
  } catch (error) {
    console.log(error);
    res.send("Failed to add to cart");
  }
});

module.exports = destinations;
