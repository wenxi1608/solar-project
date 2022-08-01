const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../../models/userdb");
const user = express.Router();
// const validators = require("../../validators/users");

const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.string().min(8).required(),
});

user.get("/", (req, res) => {
  res.render("/register.ejs");
});

user.post("/", (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

// user.post("/", async (req, res) => {
//   //Check user input
//   const validationResults = userSchema.validate(req.body);
//   console.log(validationResults);

//   if (validationResults.error) {
//     res.send("validation error occurred");
//     return;
//   }

//   const validatedResults = validationResults.value;

//   if (validatedResults.password !== validatedResults.confirm_password) {
//     res.send("passwords do not match");
//     return;
//   }

//   // Hash password
//   const hash = bcrypt.hashSync(
//     validatedResults.password,
//     bcrypt.genSaltSync(10)
//   );

//   // Store the new user in DB
//   try {
//     await User.create({
//       firstname: validatedResults.firstname,
//       lastname: validatedResults.lastname,
//       email: validatedResults.email,
//       password: hash,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send("Error: Unable to create user");
//   }
//   res.redirect("/");
//   // Pop up a page that says user created
//});

module.exports = user;
