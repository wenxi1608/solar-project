const express = require("express");
const cart = express.Router();
const User = require("../models/userdb");

cart.get("/", async (req, res) => {
  res.send("cart route working");
});

module.exports = cart;
