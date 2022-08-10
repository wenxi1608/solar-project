const express = require("express");
const logout = express.Router();

logout.get("/", async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.redirect("/");
      }
    });
  }
});

module.exports = logout;
