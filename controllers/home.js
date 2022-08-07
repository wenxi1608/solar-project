const express = require("express");
const home = express.Router();
const Products = require("../models/productdb");

home.get("/", (req, res) => {
  res.render("index.ejs", { authUser: null });
});

module.exports = home;

// Seed Data

// const seedData = require("../database/seed/seed");
// home.get("/seed", async (req, res) => {
//   await Products.insertMany(seedData);
//   res.send("ok");
// });
