const express = require("express");
const destinations = express.Router();
const Product = require("../models/productdb");

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
    const productName = req.params.dest;
    const foundProduct = await Product.findOne({ name: productName });
    console.log(foundProduct);

    res.render("products/showproduct.ejs", {
      foundProduct,
      authUser: null,
    });
  } catch (error) {
    res.send("Destination not found");
  }
});

module.exports = destinations;
