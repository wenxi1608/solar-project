const express = require("express");
const bcrypt = require("bcrypt");
const sessions = express.Router();
const User = require("../models/userdb");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sessions.get("/", (req, res) => {
  res.render("login.ejs");
});

sessions.post("/", async (req, res) => {
  const userLogin = req.body;
  let user = null;

  // Get user email from DB
  try {
    user = await User.findOne({ email: userLogin.loginemail });
  } catch (err) {
    console.log(err);
    res.send("Email not found");
    return;
  }

  // use bcrypt compare to compare pwds
  const pwMatch = await bcrypt.compare(userLogin.loginpassword, user.password);

  if (!pwMatch) {
    res.send("Password is incorrect");
    return;
  }

  // Create a session using regenerate
  req.session.regenerate((err) => {
    if (err) {
      res.status(401).send("Unauthorised");
      return;
    }

    req.session.user = user.email;
    req.session.userId = user._id;
    req.session.cartId = user.cart;
    req.session.fname = user.firstname;

    req.session.save((err) => {
      if (err) {
        res.send("Unable to save session");
        return;
      }
      res.redirect("/");
    });
  });
});

module.exports = sessions;
