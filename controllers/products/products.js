const express = require("express");
const products = express.Router();

products.get("/", (req, res) => {
  res.render("products/index.ejs");
});

module.exports = products;
