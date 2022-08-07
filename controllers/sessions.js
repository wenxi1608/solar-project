const User = require("../models/userdb");
const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();

sessions.get("/", (req, res) => {
  res.render("login.ejs", { authUser: null });
});

sessions.post("/", async (req, res) => {
  const userLogin = req.body;
  let user = null;

  // Get user email from DB
  try {
    user = await User.findOne({ email: userLogin.loginemail });
  } catch (err) {
    res.send("Email not found");
    return;
  }

  // use bcrypt compare to compare pwds
  const pwMatches = await bcrypt.compare(
    userLogin.loginpassword,
    user.password
  );

  if (!pwMatches) {
    res.send("Password is incorrect");
    return;
  }

  // Create a session using regenerate
  req.session.regenerate((err) => {
    if (err) {
      res.status(401).send("Unauthorised");
      return;
    }

    req.session.user = userLogin.loginemail;

    req.session.save((err) => {
      if (err) {
        res.send("unable to save session");
        return;
      }

      res.redirect("/profile");
    });
  });
});

// Set isAuthenticated middleware to check if the user id exists

module.exports = sessions;
