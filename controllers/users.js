const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/userdb");
const Cart = require("../models/cartdb");
const user = express.Router();
const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .messages({
      "string.min": "Please provide your first name",
    })
    .required(),
  lastname: Joi.string()
    .min(1)
    .messages({
      "string.min": "Please provide your last name",
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "string.min": "Please provide your email",
    })
    .required(),
  password: Joi.string()
    .min(8)
    .messages({
      "string.min": "Password must have at least 8 characters",
    })
    .required(),
  confirm_password: Joi.string()
    .min(8)
    .messages({
      "string.min": "Please re-enter your password",
    })
    .required(),
});

user.get("/", (req, res) => {
  res.render("register.ejs", {
    errorMsg: {},
  });
});

user.post("/", async (req, res) => {
  //Check user input
  const validation = userSchema.validate(req.body, { abortEarly: false });

  // if user input doesn't match schema, display error message

  if (validation.error) {
    let errorObject = {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      confirm_password: null,
    };

    validation.error.details.forEach((detail) => {
      errorObject[detail.context.key] = detail.message;
    });

    res.render("register.ejs", {
      errorMsg: errorObject,
    });
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

  // First create a cart document to declare cart property in user DB as cart document ._id

  const cartDoc = await Cart.create({}); // this will return cartDocument
  const cartId = cartDoc._id;
  console.log("cartDoc:", cartId);

  try {
    await User.create({
      firstname: validatedResults.firstname,
      lastname: validatedResults.lastname,
      email: validatedResults.email,
      password: hash,
      cart: cartId,
    });
  } catch (error) {
    console.log(error);
    res.send("Error: Unable to create user");
  }

  // show pop up message that user is created, when user clicks ok

  // Redirect to home page
  res.redirect("/");
});

module.exports = user;
