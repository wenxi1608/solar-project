const User = require("../models/userdb");
const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();

sessions.get("/", (req, res) => {
  res.render("/login.ejs");
});

sessions.post("/", (req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (
        foundUser &&
        bcrypt.compareSync(req.body.password, foundUser.password)
      ) {
        req.session.currentUser = foundUser;
        res.redirect("/");
      } else {
        res.send("Wrong password");
      }
    });
  } catch (error) {
    res.send("No such email");
  }
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessions;
