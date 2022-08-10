const express = require("express");
const profile = express.Router();
const User = require("../models/userdb");

profile.get("/", async (req, res) => {
  // get user data from db using session user
  let authUser = null;

  try {
    user = await User.findOne({ email: req.session.user });
  } catch (err) {
    console.log(err);
    res.redirect("/login");
    return;
  }

  res.render("profile.ejs", {
    user,
    firstName: user.firstname,
  });
});

module.exports = profile;
