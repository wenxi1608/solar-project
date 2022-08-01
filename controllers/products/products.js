const express = require("express");
const products = express.Router();
const Product = require("../../models/productdb");

products.get("/", async (req, res) => {
  try {
    const destinations = await Product.find();
    res.render("products/index.ejs", { destinations });
  } catch (error) {
    res.send("Error");
  }
});

module.exports = products;
