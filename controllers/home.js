const express = require("express");
const home = express.Router();
const Products = require("../models/productdb");

home.get("/", (req, res) => {
  res.render("index.ejs");
});

module.exports = home;
