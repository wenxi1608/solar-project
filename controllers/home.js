const express = require("express");
const home = express.Router();
const Products = require("../models/productdb");

home.get("/", (req, res) => {
  res.render("index.ejs");
});

home.get("/register", (req, res) => {
  res.render("register.ejs");
});

home.get("/login", (req, res) => {
  res.render("login.ejs");
});

module.exports = home;

// const seedData = require("../database/seed/seed");
// home.get("/seed", async (req, res) => {
//   await Products.insertMany(seedData);
//   res.send("ok");
// });
