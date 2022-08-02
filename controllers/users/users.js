const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../../models/userdb");
const user = express.Router();

const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .messages({
      "firstname.minChar": "First name must be at least 3 characters long",
    })
    .required(),
  lastname: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .messages({
      "password.minChar": "Password must have at least 8 characters",
    })
    .required(),
  confirm_password: Joi.string().min(8).required(),
});

user.get("/", (req, res) => {
  res.render("/register.ejs");
});

user.post("/", async (req, res) => {
  //Check user input
  const validation = userSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    res.send(validation.error);
    return;
  }

  const validatedResults = validation.value;

  if (validatedResults.password !== validatedResults.confirm_password) {
    res.send("passwords do not match");
    return;
  }

  // Hash password
  const hash = bcrypt.hashSync(
    validatedResults.password,
    bcrypt.genSaltSync(10)
  );

  // Store the new user in DB
  try {
    await User.create({
      firstname: validatedResults.firstname,
      lastname: validatedResults.lastname,
      email: validatedResults.email,
      password: hash,
    });
  } catch (error) {
    console.log(error);
    res.send("Error: Unable to create user");
  }
  res.redirect("/");
  // Pop up a page that says user created, then redirect
});

module.exports = user;
