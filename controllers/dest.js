const express = require("express");
const destinations = express.Router();
const Product = require("../models/productdb");
const fetch = require("node-fetch");

destinations.get("/", async (req, res) => {
  try {
    const listOfDestinations = await Product.find();
    res.render("products/index.ejs", { listOfDestinations, authUser: null });
  } catch (error) {
    res.send("Error");
  }
});

//Start2

destinations.get("/:dest", async (req, res) => {
  try {
    async function getResponse() {
      const response = await fetch(
        "https://api.le-systeme-solaire.net/rest/bodies/"
      );
      const data = await response.json();

      const productName = req.params.dest;
      const foundProduct = await Product.findOne({ name: productName });

      let discoveredBy = {};
      let discoveryDate = {};
      data.bodies.forEach((element) => {
        if (element.englishName === `${productName}`) {
          return (
            (discoveredBy = element.discoveredBy),
            (discoveryDate = element.discoveryDate)
          );
        }
      });

      res.render("products/showproduct.ejs", {
        foundProduct,
        authUser: null,
        discoveredBy,
        discoveryDate,
      });
    }
    getResponse();
  } catch (error) {
    res.send("Destination not found");
  }
});

destinations.post("/:dest", async (req, res) => {
  try {
    const productName = req.params.dest;
    const bookingOptions = req.body;

    res.redirect("/cart");
  } catch (error) {
    res.send("Failed to create booking");
  }
});

module.exports = destinations;
