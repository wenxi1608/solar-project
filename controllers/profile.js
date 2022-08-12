const express = require("express");
const profile = express.Router();
const User = require("../models/userdb");

profile.get("/", async (req, res) => {
  // get user data from db using session user
  let authUser = null;

  try {
    authUser = await User.findOne({ email: req.session.user });
  } catch (err) {
    console.log(err);
    res.redirect("/login");
    return;
  }

  res.render("profile.ejs", {
    authUser,
  });
});

profile.get("/edit", async (req, res) => {
  // get user data from db using session user
  let authUser = null;

  try {
    authUser = await User.findOne({ email: req.session.user });
  } catch (err) {
    console.log(err);
    res.redirect("/login");
    return;
  }

  res.render("profile/edit.ejs", {
    authUser,
  });
});

profile.patch("/", async (req, res) => {
  // get user data from db using session user
  let authUser = null;
  const updatedProfile = req.body;
  console.log(updatedProfile);

  try {
    authUser = await User.findByIdAndUpdate(req.session.userId, req.body);
    console.log("changes", updatedProfile);
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
    res.status(400).send("Cannot edit user");
    return;
  }
});

module.exports = profile;
