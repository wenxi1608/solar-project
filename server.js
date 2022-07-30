// Initialisation
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ghywbpy.mongodb.net/?retryWrites=true&w=majority`; //the connection from Mongo Atlas

// Middleware

// Routes
const homeController = require("./controllers/home");
app.use("/", homeController);

const productController = require("./controllers/products/products");
app.use("/products", productController);

app.listen(port, async () => {
  try {
    await mongoose.connect(connectionString, { dbName: "solar" });
    console.log("connected to db"); //wait for mongoose connection to establish successfully first
  } catch (err) {
    console.log("Failed to connect to DB"); //if we get error, then exit process altogether
    process.exit(1);
  }
  console.log(`Project listening on port ${port}`);
});
