const express = require("express");
const home = express.Router();

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
