// Initialisation
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ghywbpy.mongodb.net/?retryWrites=true&w=majority`; //the connection from Mongo Atlas

app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false, maxAge: 600000 },
  })
);

// Home Routes;
const homeController = require("./controllers/home");
app.use("/", homeController);

// Product Routes
const destController = require("./controllers/dest");
app.use("/destinations", destController);

// New User Route
const userController = require("./controllers/users");
app.use("/register", userController);

// Login/Sessions Route
const sessionsController = require("./controllers/sessions");
app.use("/login", sessionsController);

// Auth Middleware
const auth = require("./middleware/auth");

// User Authenticated Routes
const profileController = require("./controllers/profile");
app.use("/profile", auth.isAuthenticated, profileController);

app.listen(port, async () => {
  try {
    await mongoose.connect(connectionString, { dbName: "solar" });
    console.log("connected to db"); //wait for mongoose connection to establish successfully first
  } catch (err) {
    console.log(err);
    console.log("Failed to connect to DB"); //if we get error, then exit process altogether
    process.exit(1);
  }
  console.log(`Project listening on port ${port}`);
});
